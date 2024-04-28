import { getKhaoSats } from '@services/khaoSatServices'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
type SliceState = {
    loading: boolean
    khaoSats: KhaoSat[]
    selectedKhaoSat?: KhaoSat
}

const initialState: SliceState = {
    loading: false,
    khaoSats: [],
    selectedKhaoSat: undefined,
}

const khaoSatSlice = createSlice({
    name: 'khaoSat',
    initialState,
    reducers: {
        selectKhaoSat: (state, { payload }) => {
            state.selectedKhaoSat = payload.data
        },
        resetKhaoSat: () => {
            return initialState
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchDanhSachKhaoSat.pending, state => {
            state.loading = true
            state.khaoSats = []
        })
        builder.addCase(fetchDanhSachKhaoSat.fulfilled, (state, { payload }) => {
            state.loading = false
            state.khaoSats = payload
        })
        builder.addCase(fetchDanhSachKhaoSat.rejected, (state, { payload }) => {
            state.loading = false
            state.khaoSats = []
        })
    },
})

export const { selectKhaoSat } = khaoSatSlice.actions

export const fetchDanhSachKhaoSat = createAsyncThunk('fetchDanhSachKhaoSat', async (_, { rejectWithValue }) => {
    const data = await getKhaoSats()
    return data
})

export default khaoSatSlice
