import { setTokenAuthAxios } from '@utils/axios'
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import tinTucSlice from './tinTucSlice'
import dangKySlice from './dangKySlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tinTuc: tinTucSlice.reducer,
        dangKy: dangKySlice.reducer,
    },
})

store.subscribe(() => {
    const token = store.getState().user.accessToken
    if (token) {
        setTokenAuthAxios(token)
    }
})

export default store
