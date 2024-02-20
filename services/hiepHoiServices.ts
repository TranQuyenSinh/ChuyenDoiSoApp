import { axios } from '@utils/axios'
import { HiepHoi } from '@constants/HiepHoiDoanhNghiep/HiepHoiDoanhNghiepTypes'
export const getDanhSachHiepHoi = async () => {
    try {
        const { data } = await axios.get<HiepHoi>('/api/hiephoi')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy danh sách hiệp hội doanh nghiệp')
        return []
    }
}
