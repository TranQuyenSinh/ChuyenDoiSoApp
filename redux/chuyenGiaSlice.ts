import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
    chuyenGia?: ChuyenGia
}

const initialState: SliceState = {
    chuyenGia: undefined,
}

const chuyenGiaSlice = createSlice({
    name: 'chuyenGia',
    initialState,
    reducers: {
        setChuyenGia: (state, { payload }) => {
            state.chuyenGia = payload
        },
    },

})

export const { actions: chuyenGiaActions } = chuyenGiaSlice


export default chuyenGiaSlice
