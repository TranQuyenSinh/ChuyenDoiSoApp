import { loginWithPassword } from './../redux/userSlice'
import { DoanhNghiep, LoaiHinh, NganhNghe } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios, axios } from '@utils/axios'
import { toast } from '@utils/toast'
import { AxiosError } from 'axios'
import { Platform } from 'react-native'

export const updateDoanhNghiep = async (data: any) => {
    try {
        const { data: returnData } = await authAxios.post<DoanhNghiep>('doanhnghiep/edit', {
            ...data,
        })
        return returnData
    } catch (error) {
        toast('Có lỗi xảy ra')
        console.log('===> error: ', error)
        return undefined
    }
}

export const updateDaiDien = async (data: any) => {
    try {
        const { data: returnData } = await authAxios.post<DoanhNghiep>('doanhnghiep/editDaiDien', {
            ...data,
        })
        return returnData
    } catch (error) {
        console.log('===> error: ', error)
        return undefined
    }
}
export const createUser = async ({
    name,
    email,
    phone,
    dnName,
    password,
}: {
    name: string
    email: string
    phone: string
    dnName: string
    password: string
}) => {
    try {
        const { data } = await axios.post('doanhnghiep/register', {
            name,
            email,
            phone,
            tendoanhnghiep: dnName,
            password,
        })
        if (data?.success) return true
        else {
            toast(data?.message || 'Có lỗi xảy ra vui lòng thử lại')
            return false
        }
    } catch (error) {
        console.log('===> error: ', error)
        return false
    }
}

export const getDoanhNghiepPage = async (
    skip: number,
    limit = 50,
    loaiHinhId?: number,
    huyen?: number
) => {
    try {
        const { data } = await axios.get<{ total: number, member: number, data: DoanhNghiep[] }>(`doanhnghiep/page`, {
            params: { skip, limit, loaiHinhId, huyen, },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách doanh nghiệp: ', (error as AxiosError).response)
        return undefined
    }
}

export const getDoanhNghieps = async () => {
    try {
        const { data } = await axios.get<DoanhNghiep[]>('doanhnghiep/index')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy danh sách doanh nghiệp', err)
        return []
    }
}

export const getDoanhNghiep = async (id: number) => {
    try {
        const { data } = await axios.get<DoanhNghiep>(`doanhnghiep/${id}`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy doanh nghiệp: ', error)
        return undefined
    }
}

export const getNganhNghe = async () => {
    try {
        const { data } = await authAxios.get<NganhNghe[]>('doanhnghiep/nganhnghe')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy ngành nghề: ', error)
        return []
    }
}

export const getLoaiHinhDN = async () => {
    try {
        const { data } = await authAxios.get<LoaiHinh[]>('loaihinhdoanhnghiep')
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
        console.log('===> Lỗi lấy profile doanh nghiệp: ', error)
        throw error
    }
}

export const getDoanhNghiepWebsite = async () => {
    try {
        const { data } = await axios.get<DoanhNghiep[]>('doanhnghiep/website')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách website doanh nghiệp: ', error)
        return []
    }
}

export const createNhuCau = async (nhuCau: string, caiThien: string) => {
    try {
        await authAxios.post('doanhnghiep/nhucau', { nhuCau, caiThien })
        return true
    } catch (error) {
        console.log('===> Lỗi gửi nhu cầu: ', error)
        return false
    }
}

export const createHoSoNangLuc = async (file: any) => {
    console.log('🚀 ~ file: ', file)
    try {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await authAxios.post('doanhnghiep/hosonangluc', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi gửi hồ sơ năng lực: ', (error as AxiosError).response)
        return undefined
    }
}
