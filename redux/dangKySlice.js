import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { layTinhThanh } from '@services/commonServices'
import { authAxios } from '@utils/axios'
import moment from '@utils/moment'
const dangKySlice = createSlice({
    name: 'dangKy',
    initialState: {
        loading: false,
        tinhThanhs: [],

        formUser: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
        },

        formDN: {
            loaiHinhId: 1,
            tenTiengViet: '',
            tenTiengAnh: '',
            tenVietTat: '',
            // email: '',
            tinh: null,
            thanhPho: null,
            diaChi: '',
            maSoThue: '',
            fax: '',
            soLuongNhanSu: '',
            ngayLap: moment(new Date()).format('DD/MM/YYYY'),
            moTa: '',
            dienThoais: [
                {
                    id: Date.now(),
                    loaiSdt: '',
                    sdt: '',
                },
            ],
        },

        formDaiDienDN: {
            tenNguoiDaiDien: '',
            dienThoai: '',
            email: '',
            tinh: '',
            thanhPho: '',
            diaChi: '',
            cccd: '',
            // noiCap: '',
            imgMatTruoc: null,
            imgMatSau: null,
            chucVu: '',
        },
    },
    reducers: {
        resetAllForm: state => {
            state.formUser = dangKySlice.getInitialState().formUser
            state.formDN = dangKySlice.getInitialState().formDN
            state.formDaiDienDN = dangKySlice.getInitialState().formDaiDienDN
        },
        setFormUser: (state, { payload }) => {
            state.formUser = {
                ...state.formUser,
                ...payload,
            }
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

        setSoDienThoaiDN: (state, { payload }) => {
            state.formDN.dienThoais = state.formDN.dienThoais.map(item => {
                if (item.id === payload.id) {
                    item.loaiSdt = payload.loaiSdt || item.loaiSdt
                    item.sdt = payload.sdt || item.sdt
                }
                return item
            })
        },
        addSoDienThoaiDN: (state, { payload }) => {
            const id = Date.now()
            state.formDN.dienThoais.push({ id, loaiSdt: '', sdt: '' })
        },
        removeSoDienThoaiDN: (state, { payload }) => {
            state.formDN.dienThoais = state.formDN.dienThoais.filter(item => item.id !== payload)
        },
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
                state.loading = false
                state.tinhThanhs = []
                console.log('===> Lỗi lấy tỉnh thành')
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

export const dangKyDoanhNghiep = createAsyncThunk('dangKyDoanhNghiep', async (_, { getState }) => {
    try {
        const { name, email, password } = getState().dangKy.formUser
        const {
            tenNguoiDaiDien,
            dienThoai: dienThoaiDD,
            email: emailDD,
            tinh: tinhDD,
            thanhPho: thanhPhoDD,
            diaChi: diaChiDD,
            cccd,
            // noiCap,
            imgMatTruoc,
            imgMatSau,
            chucVu,
        } = getState().dangKy.formDaiDienDN
        const {
            loaiHinhId,
            tenTiengViet,
            tenTiengAnh,
            tenVietTat,
            // email: emailDN,
            tinh: tinhDN,
            thanhPho: thanhPhoDN,
            diaChi: diaChiDN,
            maSoThue,
            fax,
            soLuongNhanSu,
            ngayLap,
            moTa,
            dienThoais: dienThoaisDN,
        } = getState().dangKy.formDN
        const fullDiaChiDD = `${diaChiDD}, ${thanhPhoDD?.label}, ${tinhDD?.label}`
        const fullDiaChiDN = `${diaChiDN}, ${thanhPhoDN?.label}, ${tinhDN?.label}`

        const formData = new FormData()

        // Tài khoản
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        // Đại diện doanh nghiệp
        formData.append('tenNguoiDaiDien', tenNguoiDaiDien)
        formData.append('dienThoaiDD', dienThoaiDD)
        formData.append('emailDD', emailDD)
        formData.append('diaChiDD', fullDiaChiDD)
        formData.append('cccd', cccd)
        // formData.append('noiCap', noiCap)
        formData.append('imgMatTruoc', imgMatTruoc)
        formData.append('imgMatSau', imgMatSau)
        formData.append('chucVu', chucVu)

        // Doanh nghiệp
        formData.append('loaiHinhId', loaiHinhId)
        formData.append('tenTiengViet', tenTiengViet)
        formData.append('tenTiengAnh', tenTiengAnh)
        formData.append('tenVietTat', tenVietTat)
        // formData.append('emailDN', emailDN)
        formData.append('diaChiDN', fullDiaChiDN)
        formData.append('maSoThue', maSoThue)
        formData.append('fax', fax)
        formData.append('soLuongNhanSu', soLuongNhanSu)
        formData.append('ngayLap', ngayLap)
        formData.append('moTa', moTa)
        dienThoaisDN.forEach((item, index) => {
            formData.append(`DienThoaiDN[${index}].LoaiSdt`, item.loaiSdt)
            formData.append(`DienThoaiDN[${index}].Sdt`, item.sdt)
        })

        await authAxios.post('/api/auth/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> Error: ', JSON.stringify(error))
        console.log('===> Error: ', error)
        return false
    }
})

export default dangKySlice
