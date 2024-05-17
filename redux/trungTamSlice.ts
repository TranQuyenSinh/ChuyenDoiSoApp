import { getKhaoSats } from '@services/khaoSatServices'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
type SliceState = {
    selectedChuongTrinh?: { name: string; link: string; image?: any }
}

const initialState: SliceState = {
    selectedChuongTrinh: undefined,
}

const trungTamSlice = createSlice({
    name: 'trungTam',
    initialState,
    reducers: {
        selectChuongTrinh: (state, { payload }: { payload: { name: string, link: string, image?: any } }) => {
            state.selectedChuongTrinh = payload
        },
    },
})

export const { actions: trungTamActions } = trungTamSlice

export default trungTamSlice
