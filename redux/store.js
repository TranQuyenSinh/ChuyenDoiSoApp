import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import loginSlice from './loginSlice'
import tinTucSlice from './tinTucSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        login: loginSlice.reducer,
        tinTuc: tinTucSlice.reducer,
    },
})

export default store
