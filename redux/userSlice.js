import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import Constants from '@constants/Constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios, axios } from '@utils/axios'
import { getSecureItem, setSecureItem } from '@utils/secureStore'
import { toast } from '@utils/toast'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userProfile: undefined,
        accessToken: 'undefined',

        OAuthLoading: 'idle',
        currentRequestId: undefined,
    },
    reducers: {
        logout: (state, action) => {
            state.isLoggedIn = false
            state.userProfile = undefined
            state.accessToken = undefined
        },
    },
    extraReducers: builder => {
        builder
            // Login password
            .addCase(loginWithPassword.pending, (state, action) => {})
            .addCase(loginWithPassword.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.userProfile = action.payload.userProfile
                state.accessToken = action.payload.accessToken
            })
            .addCase(loginWithPassword.rejected, (state, action) => {
                toast(action.error.message)
            })
            // OAuth
            .addCase(loginWithOAuth.pending, (state, action) => {
                if (state.OAuthLoading === 'idle') {
                    state.OAuthLoading = 'pending'
                    state.currentRequestId = action.meta.requestId
                }
            })
            .addCase(loginWithOAuth.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (state.OAuthLoading === 'pending' && state.currentRequestId === requestId) {
                    state.isLoggedIn = true
                    state.userProfile = action.payload?.userProfile
                    state.accessToken = action.payload?.accessToken
                    state.OAuthLoading = 'idle'
                    state.currentRequestId = undefined
                }
            })
            .addCase(loginWithOAuth.rejected, (state, action) => {
                const { requestId } = action.meta
                if (state.OAuthLoading === 'pending' && state.currentRequestId === requestId) {
                    state.OAuthLoading = 'idle'
                    state.currentRequestId = undefined
                    state.isLoggedIn = false
                    toast(action.payload.message)
                    console.log('===> OAuth server thất bại: ', action.payload.message)
                }
            })
            // renewProfile
            .addCase(renewUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload
            })
    },
})

export const loginWithPassword = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        let { data } = await axios.post('/api/auth/login-password', {
            email,
            password,
        })
        const bioInfo = await getSecureItem(Constants.SecureStore.BioAuth)
        if (bioInfo?.email !== email) {
            await setSecureItem(Constants.SecureStore.BioAuth, { isEnabled: false })
        }
        await setSecureItem(Constants.SecureStore.SavedAuth, {
            type: 'password',
            email,
            password,
        })
        console.log('===> login password server thành công')
        return data
    } catch (error) {
        let { code, message } = error.response.data
        toast(message)
        return Promise.reject({ code, message })
    }
})
export const loginWithOAuth = createAsyncThunk(
    'user/login-oauth',
    async (userInfo, { getState, requestId, rejectWithValue, dispatch }) => {
        try {
            const { currentRequestId, OAuthLoading } = getState().user
            if (OAuthLoading !== 'pending' || currentRequestId !== requestId) {
                return
            }
            let { data } = await axios.post('/api/auth/login-no-password', userInfo)

            const bioInfo = await getSecureItem(Constants.SecureStore.BioAuth)
            if (bioInfo?.email !== userInfo?.email) {
                await setSecureItem(Constants.SecureStore.BioAuth, { isEnabled: false })
            }
            await setSecureItem(Constants.SecureStore.SavedAuth, {
                type: 'oauth',
                hoten: userInfo?.hoten,
                email: userInfo?.email,
            })
            console.log('===> login no password server thành công')
            return data
        } catch (error) {
            const { code, message } = error.response?.data
            dispatch(userSlice.actions.logout())
            return rejectWithValue({ code, message })
        }
    }
)

export const renewUserProfile = createAsyncThunk('user/renewUserProfile', async () => {
    const { data } = await authAxios.get('/api/account')
    return data
})

export default userSlice
