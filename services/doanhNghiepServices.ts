import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { authAxios, axios } from '@utils/axios'
import { toast } from '@utils/toast'

export const updateDoanhNghiep = async (data: any) => {
    try {
        const { data: returnData } = await authAxios.post('doanhnghiep/edit', {
            ...data
        })
        if (returnData?.success) return true
        else {
            toast(returnData?.message || 'Có lỗi xảy ra vui lòng thử lại')
            return false
        }
    } catch (error) {
        console.log('===> error: ', error)
        return false
    }
}

export const updateDaiDien = async (data: any) => {
    try {
        const { data: returnData } = await authAxios.post('doanhnghiep/editDaiDien', {
            ...data
        })
        if (returnData?.success) return true
        else {
            toast(returnData?.message || 'Có lỗi xảy ra vui lòng thử lại')
            return false
        }
    } catch (error) {
        console.log('===> error: ', error)
        return false
    }
}
export const createUser = async ({
    name,
    email,
    phone,
    dnName,
}: {
    name: string
    email: string
    phone: string
    dnName: string
}) => {
    try {
        const { data } = await axios.post('doanhnghiep/register', {
            name,
            email,
            phone,
            tendoanhnghiep: dnName,
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
        console.log('===> error: ', error)
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
