import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@utils/axios'
import { setSecureItem } from '@utils/secureStore'
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
            .addCase(loginWithPassword.pending, (state, action) => {})
            .addCase(loginWithPassword.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.userProfile = action.payload.userProfile
                state.accessToken = action.payload.accessToken
            })
            .addCase(loginWithPassword.rejected, (state, action) => {
                state.errorMessage = action.error.message
            })

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
                    state.userProfile = action.payload.userProfile
                    state.accessToken = action.payload.accessToken
                    state.OAuthLoading = 'idle'
                    state.currentRequestId = undefined
                }
            })
            .addCase(loginWithOAuth.rejected, (state, action) => {
                const { requestId } = action.meta
                if (state.OAuthLoading === 'pending' && state.currentRequestId === requestId) {
                    state.OAuthLoading = 'idle'
                    state.currentRequestId = undefined
                    console.log('===> OAuth server thất bại')
                }
            })
    },
})

export const loginWithPassword = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        let { data } = await axios.post('/api/auth/login-password', {
            email,
            password,
        })
        await setSecureItem('save_auth', {
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
export const loginWithOAuth = createAsyncThunk('user/login-oauth', async (userInfo, { getState, requestId }) => {
    const { currentRequestId, OAuthLoading } = getState().user
    if (OAuthLoading !== 'pending' || currentRequestId !== requestId) {
        return
    }
    let { data } = await axios.post('/api/auth/login-oauth', userInfo)
    await setSecureItem('save_auth', {
        type: 'oauth',
        providerKey: userInfo?.providerKey,
        hoten: userInfo?.hoten,
        email: userInfo?.email,
    })
    console.log('===> OAuth server thành công')
    return data
})

export default userSlice
