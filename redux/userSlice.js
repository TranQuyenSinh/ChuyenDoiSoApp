import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@utils/axios'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userProfile: undefined,
        accessToken: undefined,
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
            .addCase(loginWithPassword.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginWithPassword.fulfilled, (state, action) => {
                state.status = 'success'
                state.isLoggedIn = true
                state.userProfile = action.payload.userProfile
                state.accessToken = action.payload.accessToken
            })
            .addCase(loginWithPassword.rejected, (state, action) => {
                state.status = 'error'
                state.errorMessage = action.error.message
                console.log(action.error)
            })

            .addCase(loginWithOAuth.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginWithOAuth.fulfilled, (state, action) => {
                state.status = 'success'
                state.isLoggedIn = true
                state.userProfile = action.payload.userProfile
                state.accessToken = action.payload.accessToken
            })
            .addCase(loginWithOAuth.rejected, (state, action) => {
                state.status = action.error.code
            })
    },
})

export const loginWithPassword = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        // let { data } = await axios.get('/api/auth/test')
        console.log('Email: ', email)
        console.log('Password: ', password)
        let { data } = await axios.post('/api/auth/login-password', {
            email,
            password,
        })
        return data
    } catch (error) {
        let { code, message } = error.response.data
        return Promise.reject({ code, message })
    }
})
export const loginWithOAuth = createAsyncThunk('user/login-oauth', async userInfo => {
    try {
        console.log('===> Bắt đầu login oauth server')
        let { data } = await axios.post('/api/auth/login-oauth', userInfo)
        console.log('===> OAuth server thành công')
        return data
    } catch (error) {
        let { code, message } = error.response?.data
        console.log('===> OAuth server thất bại')

        return Promise.reject({ code, message })
    }
})

export default userSlice
