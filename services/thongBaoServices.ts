import { ThongBao } from '@constants/ThongBao/ThongBaoType'
import { authAxios } from '@utils/axios'

export const getThongBaos = async () => {
    try {
        const { data } = await authAxios.get<ThongBao[]>('/thongbao')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thông báo: ', error);
        return []
    }
}

export const readThongBao = async (id: number) => {
    try {
        const { data } = await authAxios.put<ThongBao[]>(`/thongbao/${id}/read`)
        return data
    } catch (error) {
        console.log('===> Lỗi đọc thông báo: ', error);
        return []
    }
}

export const deleteThongBao = async (id: number) => {
    try {
        const { data } = await authAxios.delete<ThongBao[]>(`/thongbao/${id}`)
        return data
    } catch (error) {
        console.log('===> Lỗi xóa thông báo: ', error);
        return []
    }
}

export const createThongBao = async (tieuDe: string, noiDung: string, guiDen: 'all' | 'hoivien') => {
    try {
        await authAxios.post('/thongbao', { tieuDe, noiDung, guiDen })
        return true
    } catch (error) {
        console.log('===> Lỗi tạo thông báo: ', error);
        return false
    }
}