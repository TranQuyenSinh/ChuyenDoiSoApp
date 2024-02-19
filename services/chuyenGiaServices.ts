import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { axios } from '@utils/axios'

export const getChuyenGias = async (linhVucId: string) => {
    try {
        const { data } = await axios.get<ChuyenGia>('/api/chuyengia', { params: { linhVucId } })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách chuyên gia', JSON.stringify(error))
        return []
    }
}
