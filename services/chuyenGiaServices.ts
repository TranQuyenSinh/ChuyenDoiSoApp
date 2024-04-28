import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { axios } from '@utils/axios'

export const getChuyenGias = async (linhVucId?: string) => {
    try {
        const { data } = await axios.get<ChuyenGia[]>(`chuyengia`, {
            params: { linhvucid: linhVucId },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách chuyên gia', error)
        return []
    }
}

export const getChuyenGia = async (id: number) => {
    try {
        const { data } = await axios.get<ChuyenGia>(`chuyengia/${id}`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy chuyên gia', error)
        return undefined
    }
}
