import { ThacMac } from '@constants/CommonTypes/ThacMacType'
import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

export const postTraLoi = async (id: number, traLoi: string) => {
    try {
        const { data } = await authAxios.post<ThacMac>(`/thacmac/traloi/${id}`, { traLoi })
        return data
    } catch (error) {
        console.log('===> Lỗi gửi trả lời thắc mắc: ', (error as AxiosError).response)
        return undefined
    }
}

export const getAllThacMac = async () => {
    try {
        const { data } = await authAxios.get<ThacMac[]>('/thacmac')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy tất cả thắc mắc: ', (error as AxiosError).response)
        return []
    }

}

export const getThacMacOfUser = async () => {
    try {
        const { data } = await authAxios.get('/thacmac/user')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thắc mắc user: ', (error as AxiosError).response)
        return []
    }
}

export const createThacMac = async (noiDung: string) => {
    try {
        const { data } = await authAxios.post('/thacmac/create', { noiDung })
        return data
    } catch (error) {
        console.log('===> Lỗi tạo thắc mắc: ', (error as AxiosError).response)
        return undefined
    }
}

export const deleteThacMac = async (id: number) => {
    try {
        await authAxios.delete(`/thacmac/${id}`)
        return true
    } catch (error) {
        console.log('===> Lỗi xóa thắc mắc: ', (error as AxiosError).response)
        return false
    }
}