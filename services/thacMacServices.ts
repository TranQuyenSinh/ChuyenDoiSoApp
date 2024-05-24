import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

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