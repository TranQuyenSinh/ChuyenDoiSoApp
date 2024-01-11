import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userProfile: undefined,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
        },
        logout: (state, action) => {
            state.isLoggedIn = false
        },
    },
})

export default userSlice
