import { ThongBao } from '@constants/ThongBao/ThongBaoType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getThongBaos, readThongBao as rThongBao, deleteThongBao as dThongBao } from '@services/thongBaoServices'

type SliceState = {
    thongBaos: ThongBao[]
}

const initialState: SliceState = {
    thongBaos: []
}

const thongBaoSlice = createSlice({
    name: 'thongBao',
    initialState,
    reducers: {
        setThongBao: (state, { payload }) => {
            state.thongBaos = payload
        },
        resetThongBao: () => {
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchThongBao.fulfilled, (state, { payload }) => {
            state.thongBaos = payload
        })
        builder.addCase(readThongBao.fulfilled, (state, { payload }) => {
            state.thongBaos = payload
        })
        builder.addCase(deleteThongBao.fulfilled, (state, { payload }) => {
            state.thongBaos = payload
        })
    },

})

export const fetchThongBao = createAsyncThunk('fetchThongBao', async () => {
    const data = await getThongBaos()
    return data
})

export const readThongBao = createAsyncThunk('readThongBao', async (id: number,) => {
    const data = await rThongBao(id)
    return data
})

export const deleteThongBao = createAsyncThunk('deleteThongBao', async (id: number,) => {
    const data = await dThongBao(id)
    return data
})

export const { actions: thongBaoActions } = thongBaoSlice
export default thongBaoSlice
