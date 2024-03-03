import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios } from '@utils/axios'

export const getLoaiHinhDN = async () => {
    try {
        const { data } = await authAxios.get<LoaiHinh>('/api/loaihinhdoanhnghiep')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy loại hình doanh nghiệp')
        return []
    }
}

export const getThongTinDN = async () => {
    const { data } = await authAxios.get<DoanhNghiep>('/api/doanhnghiep/profile')
    return data
}
