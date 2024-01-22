import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBinhLuanByTinTucId } from '@services/binhLuanServices'
import userSlice from './userSlice'
import * as binhLuanServices from '@services/binhLuanServices'

const tinTucSlice = createSlice({
    name: 'tinTuc',
    initialState: {
        tinTucId: null,
        binhLuans: null,
        binhLuanLoading: 'idle',
    },
    reducers: {
        setTinTuc: (state, { payload }) => {
            state.tinTucId = payload.tinTucId
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBinhLuan.pending, (state, action) => {
                state.binhLuanLoading = 'pending'
            })
            .addCase(fetchBinhLuan.fulfilled, (state, action) => {
                state.binhLuanLoading = 'idle'
                state.binhLuans = action.payload
            })
            .addCase(fetchBinhLuan.rejected, (state, action) => {
                state.binhLuanLoading = 'idle'
            })
    },
})

export const fetchBinhLuan = createAsyncThunk('tinTuc/fetchBinhLuan', async (_, { getState }) => {
    let { tinTucId, binhLuanLoading } = getState().tinTuc
    if (!tinTucId) return
    const data = await getBinhLuanByTinTucId(tinTucId)
    return data
})

export const themBinhLuan = createAsyncThunk(
    'tinTuc/themBinhLuan',
    async ({ noiDung, binhLuanChaId = null }, { getState }) => {
        const userId = getState().user.userProfile?.id
        const { tinTucId } = getState().tinTuc
        if (!userId || !tinTucId) return
        await binhLuanServices.themBinhLuan({
            noiDung,
            tinTucId,
            userId,
            binhLuanChaId,
        })
    }
)

export default tinTucSlice
