import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios, axios } from '@utils/axios'

export const getDoanhNghieps = async () => {
    try {
        const { data } = await axios.get<DoanhNghiep[]>('doanhnghiep/index')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy danh sách doanh nghiệp', err)
        return []
    }
}

export const getLoaiHinhDN = async () => {
    try {
        const { data } = await authAxios.get<LoaiHinh>('loaihinhdoanhnghiep')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy loại hình doanh nghiệp')
        return []
    }
}

export const getThongTinDN = async () => {
    try {
        const { data } = await authAxios.get<DoanhNghiep>('doanhnghiep/profile')
        return data
    } catch (error) {
        console.log('===> error: ', error)
        throw error
    }
}
