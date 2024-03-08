import { setTokenAuthAxios } from '@utils/axios'
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import tinTucSlice from './tinTucSlice'
import dangKySlice from './dangKySlice'
import doanhNghiepSlice from './doanhNghiepSlice'
import khaoSatSlice from './khaoSatSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tinTuc: tinTucSlice.reducer,
        dangKy: dangKySlice.reducer,
        doanhNghiep: doanhNghiepSlice.reducer,
        khaoSat: khaoSatSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

store.subscribe(() => {
    const token = store.getState().user.accessToken
    if (token) {
        setTokenAuthAxios(token)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
