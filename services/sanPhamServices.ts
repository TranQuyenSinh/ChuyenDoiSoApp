import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { authAxios, axios } from '@utils/axios'

export const getSanPhamByDoanhNghiep = async (id: number) => {
    try {
        const { data } = await axios.get<SanPham[]>(`doanhnghiep/${id}/sanpham`)
        return data
    } catch (err) {
        console.log('===> Lỗi tạo sản phẩm: ', err.response)
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

export const createSanPham = async (name: string, price: string, description: string, hinhAnhs: any[]) => {
    try {
        const formData = new FormData()
        formData.append(`tenSanPham`, name)
        formData.append(`gia`, price)
        formData.append(`moTa`, description)
        hinhAnhs.forEach(item => {
            formData.append(`hinhAnhs[]`, item)
        })
        await authAxios.post('sanpham/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> Lỗi tạo sản phẩm: ', error)
        return false
    }
}
