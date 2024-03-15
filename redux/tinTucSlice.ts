import { BinhLuan } from '@constants/TinTuc/BinhLuanTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBinhLuanByTinTucId } from '@services/binhLuanServices'
import * as binhLuanServices from '@services/binhLuanServices'
import { RootState } from './store'

type SliceState = {
    tinTucId?: number
    binhLuans?: BinhLuan[]
    binhLuanLoading: string
}

const initialState: SliceState = {
    tinTucId: undefined,
    binhLuans: [],
    binhLuanLoading: 'idle',
}

const tinTucSlice = createSlice({
    name: 'tinTuc',
    initialState,
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
    const {
        tinTuc: { tinTucId },
    } = getState() as RootState
    if (!tinTucId) return
    const data = await getBinhLuanByTinTucId(tinTucId)
    return data
})

export const themBinhLuan = createAsyncThunk(
    'tinTuc/themBinhLuan',
    async ({ noiDung, binhLuanChaId }: { noiDung: string; binhLuanChaId?: number }, { getState }) => {
        const {
            tinTuc: { tinTucId },
            user: { userProfile },
        } = getState() as RootState
        if (!tinTucId) return

        await binhLuanServices.themBinhLuan({
            userId: userProfile?.id,
            noiDung,
            tinTucId,
            binhLuanChaId,
        })
    }
)

export default tinTucSlice
