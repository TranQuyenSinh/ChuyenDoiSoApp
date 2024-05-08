import { AnhSanPham, SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { authAxios, axios } from '@utils/axios'
import { AxiosError } from 'axios'

export const getSanPhamByDoanhNghiep = async (id: number) => {
    try {
        const { data } = await axios.get<SanPham[]>(`doanhnghiep/${id}/sanpham`)
        return data
    } catch (err) {
        console.log('===> Lỗi lấy danh sách sản phẩm doanh nghiệp', err)
        return []
    }
}

export const getSanPham = async (id: number) => {
    try {
        const { data } = await axios.get<SanPham>(`sanpham/${id}`)
        return data
    } catch (err) {
        console.log('===> Lỗi lấy sản phẩm', err)
        return undefined
    }
}

export const createSanPham = async (name: string, price: string, description: string, hinhAnhs: any) => {
    try {
        const formData = new FormData()
        formData.append(`tenSanPham`, name)
        formData.append(`gia`, price)
        formData.append(`moTa`, description)
        hinhAnhs.forEach((image: any) => {
            formData.append(`hinhAnhs[]`, image)
        })
        const { data } = await authAxios.post<SanPham[]>('sanpham/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi tạo sản phẩm: ', (error as AxiosError).response)
        return undefined
    }
}

export const editSanPham = async (id: number, name: string, price: string, description: string) => {
    try {
        const formData = new FormData()
        formData.append(`tenSanPham`, name)
        formData.append(`gia`, price)
        formData.append(`moTa`, description)
        const { data } = await authAxios.post<SanPham[]>(`sanpham/${id}/edit`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log('🚀 ~ data: ', data)
        return data
    } catch (error) {
        console.log('===> Lỗi sửa sản phẩm: ', error)
        return undefined
    }
}

export const deleteSanPham = async (id: number) => {
    try {
        const { data } = await authAxios.delete<SanPham[]>(`sanpham/${id}`)
        return data
    } catch (error) {
        console.log('===> Lỗi xóa sản phẩm: ', error)
        return undefined
    }
}

export const addAnhSanPham = async (sanPhamId: number, hinhAnh: any) => {
    try {
        const formData = new FormData()
        formData.append(`id`, sanPhamId?.toString())
        formData.append(`hinhAnh`, hinhAnh)

        const { data } = await authAxios.post<AnhSanPham>(`sanpham/hinhanh/create`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi tạo ảnh sản phẩm: ', (error as AxiosError).response)
        return undefined
    }
}

export const deleteAnhSanPham = async (id: number) => {
    try {
        await authAxios.delete(`sanpham/hinhanh/${id}`)
        return true
    } catch (error) {
        console.log('===> Lỗi xóa ảnh sản phẩm: ', (error as AxiosError).response)
        return false
    }
}
