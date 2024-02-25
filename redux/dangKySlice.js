import { toast } from '@utils/toast'
import { authAxios, axios } from '@utils/axios'
import { layTinhThanh } from '@services/commonServices'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const dangKySlice = createSlice({
    name: 'dangKy',
    initialState: {
        loading: false,
        tinhThanhs: [],

        formUser: {
            name: 'Nguyễn Thị Quỳnh Trâm',
            email: 'qt391997@gmail.com',
            password: 'Anhzer020',
            rePassword: 'Anhzer020',
        },

        formDN: {
            loaiHinhId: null,
            tenTiengViet: 'Cảnh Toàn',
            tenTiengAnh: 'Canh Toan',
            tenVietTat: '',
            tinh: null,
            thanhPho: null,
            diaChi: '30A, Trần Hưng Đạo',
            maSoThue: '98458475',
            fax: '',
            soLuongNhanSu: '30',
            ngayLap: '19/03/2013',
            moTa: 'Bán Laptop',
            dienThoais: [
                {
                    id: Date.now(),
                    loaiSdt: 'Di động',
                    sdt: '0913615485',
                },
            ],
        },

        formDaiDienDN: {
            tenNguoiDaiDien: 'Nguyễn Thị Quỳnh Trâm',
            dienThoai: '0937456575',
            email: 'qt391997@gmail.com',
            tinh: null,
            thanhPho: null,
            diaChi: '5M2, Đặng Dung, Khóm 3',
            cccd: '08748577567',
            imgMatTruoc: null,
            imgMatSau: null,
            chucVu: null,
        },
    },
    reducers: {
        resetAllForm: state => {
            state.formUser = dangKySlice.getInitialState().formUser
            state.formDN = dangKySlice.getInitialState().formDN
            state.formDaiDienDN = dangKySlice.getInitialState().formDaiDienDN
        },
        setFormUser: (state, { payload }) => {
            state.formUser[payload.field] = payload.value
        },
        setFormDN: (state, { payload }) => {
            state.formDN[payload.field] = payload.value
        },
        setFormDaiDienDN: (state, { payload }) => {
            state.formDaiDienDN[payload.field] = payload.value
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

            // Đăng ký doanh nghiệp
            .addCase(dangKyDoanhNghiep.rejected, (_, { payload }) => {
                toast(payload?.message)
                console.log('🚀 ~ Lỗi đăng ký doanh nghiệp: ', payload?.message)
            })
    },
})

export const fetchTinhThanh = createAsyncThunk('fetchTinhThanh', async () => {
    const tinhThanhs = await layTinhThanh()
    return tinhThanhs
})

export const dangKyDoanhNghiep = createAsyncThunk('dangKyDoanhNghiep', async (_, { getState, rejectWithValue }) => {
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
        const fullDiaChiDD = `${diaChiDD}, ${thanhPhoDD}, ${tinhDD}`
        const fullDiaChiDN = `${diaChiDN}, ${thanhPhoDN}, ${tinhDN}`

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

        await axios.post('/api/auth/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    } catch (error) {
        const errData = error?.response?.data
        console.log('===> error: ', JSON.stringify(error))
        return rejectWithValue({ code: errData?.code, message: errData?.message })
    }
})

export default dangKySlice
