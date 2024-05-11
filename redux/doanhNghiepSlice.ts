import { User } from '@constants/CommonTypes/UserType';
import { ThanhTich } from './../constants/DoanhNghiep/DoanhNghiepTypes';
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getThongTinDN } from '@services/doanhNghiepServices'
import { toast } from '@utils/toast'
import { Axios, AxiosError } from 'axios'

type SliceState = {
    status: 'idle' | 'loading' | 'success' | 'error'
    doanhNghiep?: DoanhNghiep
    sanPhams?: SanPham[]
}

const initialState: SliceState = {
    status: 'idle',
    doanhNghiep: undefined,
    sanPhams: []
}

const doanhNghiepSlice = createSlice({
    name: 'doanhNghiep',
    initialState,
    reducers: {
        setDoanhNghiep: (state, { payload }) => {
            state.doanhNghiep = payload
        },
        setSanPhams: (state, { payload }) => {
            state.sanPhams = payload
        },
        setThanhTichs: (state, { payload }: { payload: ThanhTich[] }) => {
            state.doanhNghiep = Object.assign({}, state.doanhNghiep, { thanhTich: payload })
        },
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

export const { actions: doanhNghiepActions } = doanhNghiepSlice
export default doanhNghiepSlice
