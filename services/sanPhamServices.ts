import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { authAxios, axios } from '@utils/axios'

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

export const createSanPham = async (name: string, price: string, description: string, hinhAnh: any) => {
    try {
        const formData = new FormData()
        formData.append(`tenSanPham`, name)
        formData.append(`gia`, price)
        formData.append(`moTa`, description)
        formData.append(`hinhAnh`, hinhAnh)
        await authAxios.post('sanpham/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> Lỗi tạo sản phẩm: ', error)
        return false
    }
}

export const editSanPham = async (id: number, name: string, price: string, description: string, hinhAnh?: any, removeImage?: boolean) => {
    try {
        const formData = new FormData()
        formData.append(`tenSanPham`, name)
        formData.append(`gia`, price)
        formData.append(`moTa`, description)
        formData.append(`hinhAnh`, hinhAnh)
        formData.append(`removeImage`, removeImage ? 'true' : 'false')
        await authAxios.post(`sanpham/${id}/edit`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> Lỗi sửa sản phẩm: ', error)
        return false
    }
}

export const deleteSanPham = async (id: number) => {
    try {
        const formData = new FormData()
        await authAxios.delete(`sanpham/${id}`)
        return true
    } catch (error) {
        console.log('===> Lỗi xóa sản phẩm: ', error)
        return false
    }
}
