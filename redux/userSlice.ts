import Constants from '@constants/Constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios, axios } from '@utils/axios'
import { getSecureItem, setSecureItem } from '@utils/secureStore'
import { toast } from '@utils/toast'
import { RootState } from './store'
import { User } from '@constants/CommonTypes/UserType'
type SliceState = {
    loading: boolean,

    isLoggedIn: boolean,
    userProfile?: User,
    accessToken?: string,

    OAuthLoading: 'idle' | 'pending',
    currentRequestId: any,
}

const initialState: SliceState = {
    loading: false,
    isLoggedIn: false,
    userProfile: undefined,
    accessToken: undefined,
    OAuthLoading: 'idle',
    currentRequestId: undefined,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false
            state.userProfile = undefined
            state.accessToken = undefined
        },
    },
    extraReducers: builder => {
        builder
            // Login password
            .addCase(loginWithPassword.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginWithPassword.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.loading = false
                state.userProfile = action.payload.userProfile
                state.accessToken = action.payload.accessToken
                console.log('===>action.payload: ', action.payload)
            })
            .addCase(loginWithPassword.rejected, state => {
                state.loading = false
                state.isLoggedIn = false
                state.userProfile = undefined
                state.accessToken = undefined
            })
            // OAuth
            .addCase(loginWithOAuth.pending, (state, action) => {
                if (state.OAuthLoading === 'idle') {
                    state.OAuthLoading = 'pending'
                    state.loading = true
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
                    state.loading = false
                    state.currentRequestId = undefined
                }
            })
            .addCase(loginWithOAuth.rejected, (state, action) => {
                const { requestId } = action.meta
                if (state.OAuthLoading === 'pending' && state.currentRequestId === requestId) {
                    state.OAuthLoading = 'idle'
                    state.loading = false
                    state.currentRequestId = undefined
                    state.isLoggedIn = false
                }
            })
            // renewProfile
            .addCase(renewUserProfile.fulfilled, (state, { payload }) => {
                state.userProfile = payload
            })
    },
})

export const loginWithPassword = createAsyncThunk('user/login', async ({ email, password }: any) => {
    try {
        let { data } = await axios.post<{ userProfile: User, accessToken: string }>('doanhnghiep/login', { email, password })
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
    } catch (err) {
        return Promise.reject({ err })
    }
})
export const loginWithOAuth = createAsyncThunk(
    'user/login-oauth',
    async (userInfo: any, { getState, requestId, dispatch }) => {
        try {
            const { currentRequestId, OAuthLoading } = (getState() as RootState).user
            if (OAuthLoading !== 'pending' || currentRequestId !== requestId) {
                return
            }
            let { data } = await axios.post<{ userProfile: User, accessToken: string }>('doanhnghiep/loginemail', userInfo)

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
        } catch (err) {
            dispatch(userSlice.actions.logout())
            return Promise.reject({ err })
        }
    }
)
export const renewUserProfile = createAsyncThunk('user/renewUserProfile', async () => {
    const { data } = await authAxios.get<User>('taikhoan/profile')
    return data
})
export const logOutServer = createAsyncThunk('user/logoutServer', async () => {
    await authAxios.post('doanhnghiep/logout')
})

export default userSlice
