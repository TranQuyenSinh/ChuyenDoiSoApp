import { setTokenAuthAxios } from '@utils/axios'
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import tinTucSlice from './tinTucSlice'
import dangKySlice from './dangKySlice'
import doanhNghiepSlice from './doanhNghiepSlice'
import khaoSatSlice from './khaoSatSlice'
import trungTamSlice from './trungTamSlice'
import thongBaoSlice from './thongBaoSlice'
import chuyenGiaSlice from './chuyenGiaSlice'
import { useDispatch, useSelector } from 'react-redux'
import chatSlice from '@components/Chat/chat.slice'
import thacMacSlice from './thacMac.slice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tinTuc: tinTucSlice.reducer,
        dangKy: dangKySlice.reducer,
        doanhNghiep: doanhNghiepSlice.reducer,
        khaoSat: khaoSatSlice.reducer,
        trungTam: trungTamSlice.reducer,
        thongBao: thongBaoSlice.reducer,
        chuyenGia: chuyenGiaSlice.reducer,
        chat: chatSlice.reducer,
        thacMac: thacMacSlice.reducer
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
    } else {
        setTokenAuthAxios(null)
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useAppSelector<T>(cb: (s: RootState) => T) {
    return useSelector(cb);
}
export default store
