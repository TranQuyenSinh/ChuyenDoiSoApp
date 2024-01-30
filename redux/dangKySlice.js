import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { layTinhThanh } from '@services/commonServices'
import moment from '@utils/moment'
const dangKySlice = createSlice({
    name: 'dangKy',
    initialState: {
        pageIndex: 0,
        loading: false,
        tinhThanhs: [],

        formDN: {
            ten: '',
            tenTiengAnh: '',
            tenVietTat: '',
            linhVucId: null,
            loaiHinhId: null,
            maSoThue: '',
            ngayHoatDong: moment(new Date()).format('DD/MM/YYYY'),
            vonDieuLe: '',
            quyMoNhanSu: '',
            moTa: '',
            tinh: null,
            thanhPho: null,
            diaChi: '',
            email: '',
            dienThoai: '',
            fax: '',
        },

        formDaiDienDN: {
            ten: '',
            cccd: '',
            noiCap: '',
            dienThoai: '',
            email: '',
            tinh: '',
            thanhPho: '',
            diaChi: '',
            chucVu: '',
        },
    },
    reducers: {
        setPageIndex: (state, { payload }) => {
            state.pageIndex = payload.pageIndex
        },
        setFormDN: (state, { payload }) => {
            state.formDN = {
                ...state.formDN,
                ...payload,
            }
        },
        setFormDaiDienDN: (state, { payload }) => {
            state.formDaiDienDN = {
                ...state.formDaiDienDN,
                ...payload,
            }
        },
        // setState: (state, { payload }) => {
        //     state.providerName = payload.providerName
        //     state.clerkUser = JSON.parse(payload.clerkUser || '')
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTinhThanh.pending, state => {
                state.loading = true
                state.tinhThanhs = []
            })
            .addCase(fetchTinhThanh.fulfilled, (state, { payload }) => {
                state.loading = false
                state.tinhThanhs = payload
            })
            .addCase(fetchTinhThanh.rejected, state => {
                state.loading = true
                state.tinhThanhs = []
            })
    },
})

export const fetchTinhThanh = createAsyncThunk('fetchTinhThanh', async () => {
    const tinhThanhs = await layTinhThanh()
    const tinhs = tinhThanhs?.map(tinh => {
        const thanhPhos = tinh?.Districts?.map(thanhPho => ({
            id: thanhPho.Id,
            value: thanhPho.Name,
            label: thanhPho.Name,
        }))
        return { id: tinh.Id, value: tinh.Name, label: tinh.Name, thanhPhos }
    })
    return tinhs
})

export const dangKyDoanhNghiep = createAsyncThunk('dangKyDoanhNghiep', async () => {})

export default dangKySlice
