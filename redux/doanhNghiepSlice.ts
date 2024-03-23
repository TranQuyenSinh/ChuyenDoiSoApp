import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getThongTinDN } from '@services/doanhNghiepServices'
import { toast } from '@utils/toast'
import { Axios, AxiosError } from 'axios'

type SliceState = {
    status: 'idle' | 'loading' | 'success' | 'error'
    doanhNghiep?: DoanhNghiep
}

const initialState: SliceState = {
    status: 'idle',
    doanhNghiep: undefined,
}

const doanhNghiepSlice = createSlice({
    name: 'doanhNghiep',
    initialState,
    reducers: {
        resetDoanhNghiep: () => {
            return initialState
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchDoanhNghiepInfo.pending, state => {
            state.status = 'loading'
            state.doanhNghiep = undefined
        })
        builder.addCase(fetchDoanhNghiepInfo.fulfilled, (state, { payload }) => {
            state.status = 'success'
            state.doanhNghiep = payload
        })
        builder.addCase(fetchDoanhNghiepInfo.rejected, (state, { payload }) => {
            state.status = 'error'
            state.doanhNghiep = undefined
            toast(payload || 'Lỗi lấy thông tin doanh nghiệp')
        })
    },
})

export const fetchDoanhNghiepInfo = createAsyncThunk('fetchDoanhNghiepInfo', async (_, { rejectWithValue }) => {
    try {
        const data = await getThongTinDN()
        return data
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        return rejectWithValue(err?.response?.data?.error)
    }
})

export default doanhNghiepSlice
