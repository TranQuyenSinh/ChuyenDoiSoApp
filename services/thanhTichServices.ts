import { ThanhTich } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios, axios } from '@utils/axios'
import { AxiosError } from 'axios'

export const createThanhTich = async (name: string, image: any) => {
    try {
        const formData = new FormData()
        formData.append(`tenthanhtich`, name)
        formData.append(`hinhanh`, image)
        const { data } = await authAxios.post<ThanhTich[]>('doanhnghiep/thanhtich/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi tạo thành tích: ', (error as AxiosError).response)
        return undefined
    }
}

export const deleteThanhTich = async (id: number) => {
    try {
        await authAxios.delete<ThanhTich[]>(`doanhnghiep/thanhtich/${id}`)
        return true
    } catch (error) {
        console.log('===> Lỗi xóa thành tích: ', (error as AxiosError).response)
        return false
    }
}