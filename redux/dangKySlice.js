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
            tenVietTat: 'CT',
            thanhPho: null,
            huyen: null,
            xa: null,
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
                {
                    id: Date.now() * 2,
                    loaiSdt: 'Bàn',
                    sdt: '0845473875',
                },
            ],
        },

        formDaiDienDN: {
            tenNguoiDaiDien: 'Nguyễn Thị Quỳnh Trâm',
            dienThoai: '0937456575',
            email: 'qt391997@gmail.com',
            thanhPho: null,
            huyen: null,
            xa: null,
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
                // toast(payload?.message)
                console.log('🚀 ~ Lỗi đăng ký doanh nghiệp: ')
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
            thanhPho: thanhPhoDD,
            huyen: huyenDD,
            xa: xaDD,
            diaChi: diaChiDD,
            cccd,
            imgMatTruoc,
            imgMatSau,
            chucVu,
        } = getState().dangKy.formDaiDienDN
        const {
            loaiHinhId,
            tenTiengViet,
            tenTiengAnh,
            tenVietTat,
            thanhPho: thanhPhoDN,
            huyen: huyenDN,
            xa: xaDN,
            diaChi: diaChiDN,
            maSoThue,
            fax,
            soLuongNhanSu,
            ngayLap,
            moTa,
            dienThoais: dienThoaisDN,
        } = getState().dangKy.formDN

        const formData = new FormData()

        // Tài khoản
        formData.append('email', email)
        formData.append('name', name)
        formData.append('password', password)

        // Đại diện doanh nghiệp
        formData.append('doanhnghiep_daidien_tendaidien', tenNguoiDaiDien)
        formData.append('doanhnghiep_daidien_email', emailDD)
        formData.append('doanhnghiep_daidien_sdt', dienThoaiDD)
        formData.append('doanhnghiep_daidien_cccd', cccd)
        formData.append('doanhnghiep_daidien_thanhpho', thanhPhoDD.name)
        formData.append('doanhnghiep_daidien_huyen', huyenDD.name)
        formData.append('doanhnghiep_daidien_xa', xaDD.name)
        formData.append('doanhnghiep_daidien_diachi', diaChiDD)
        formData.append('doanhnghiep_daidien_chucvu', chucVu.name)
        formData.append('doanhnghiep_daidien_img_mattruoc', imgMatTruoc)
        formData.append('doanhnghiep_daidien_img_matsau', imgMatSau)

        // Doanh nghiệp
        formData.append('doanhnghiep_loaihinh_id', loaiHinhId.id)
        formData.append('doanhnghiep_tentiengviet', tenTiengViet)
        formData.append('doanhnghiep_tentienganh', tenTiengAnh)
        formData.append('doanhnghiep_tenviettat', tenVietTat)
        formData.append('doanhnghiep_ngaylap', ngayLap)
        formData.append('doanhnghiep_mathue', maSoThue)
        formData.append('doanhnghiep_fax', fax)
        formData.append('doanhnghiep_soluongnhansu', soLuongNhanSu)
        formData.append('doanhnghiep_thanhpho', thanhPhoDN.name)
        formData.append('doanhnghiep_huyen', huyenDN.name)
        formData.append('doanhnghiep_xa', xaDN.name)
        formData.append('doanhnghiep_diachi', diaChiDN)
        formData.append('doanhnghiep_mota', moTa)

        dienThoaisDN.forEach((item, index) => {
            formData.append(`doanhnghiep_sdt[]`, JSON.stringify(item))
        })

        await axios.post('/api/doanhnghiep/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    } catch (error) {
        const errData = error?.response?.data
        console.log('===> error: ', errData)
        // return rejectWithValue({ code: errData?.code, message: errData?.message })
        return rejectWithValue()
    }

    // try {
    //     const formData = new FormData()
    //     formData.append('test', 123)
    //     await axios.post('/api/doanhnghiep/test', formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     })
    //     console.log('===> Đã đăng ký thành công: ')
    // } catch (error) {
    //     console.log('===> Lỗi đăng ký: ', error)
    // }
})

export default dangKySlice
