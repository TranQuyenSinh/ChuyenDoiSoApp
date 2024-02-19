import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getThongTinDN } from '@services/doanhNghiepServices'

const doanhNghiepSlice = createSlice({
    name: 'doanhNghiep',
    initialState: {
        status: false,
        doanhNghiep: null,
    },

    extraReducers: builder => {
        builder.addCase(fetchDoanhNghiepInfo.pending, state => {
            state.status = 'loading'
            state.doanhNghiep = null
        })
        builder.addCase(fetchDoanhNghiepInfo.fulfilled, (state, { payload }) => {
            state.status = 'success'
            state.doanhNghiep = payload
        })
        builder.addCase(fetchDoanhNghiepInfo.rejected, state => {
            state.status = 'error'
            state.doanhNghiep = null
        })
    },
})

export const fetchDoanhNghiepInfo = createAsyncThunk('fetchDoanhNghiepInfo', async () => {
    const data = await getThongTinDN()
    return data
})

export default doanhNghiepSlice
