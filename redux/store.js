import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import loginSlice from './loginSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        login: loginSlice.reducer,
    },
})

export default store
