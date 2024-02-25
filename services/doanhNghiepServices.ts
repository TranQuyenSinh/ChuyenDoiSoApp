import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios } from '@utils/axios'

export const getLoaiHinhDN = async () => {
    try {
        const { data } = await authAxios.get<LoaiHinh[]>('/api/doanhnghiep/loaihinh')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy loại hình doanh nghiệp')
        return []
    }
}

export const getThongTinDN = async () => {
    try {
        const { data } = await authAxios.get<DoanhNghiep>('/api/doanhnghiep/doanhnghiep-info')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thông tin doanh nghiệp')
        return null
    }
}
