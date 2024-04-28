import { BaiViet, BinhLuanBaiViet, DanhMucBaiViet } from '@constants/DienDan/DienDanTypes'
import { authAxios, axios, thongtinAuthAxios } from '@utils/axios'
import { forEach } from 'lodash'

export const getBaiViets = async () => {
    try {
        const { data } = await authAxios.get<BaiViet[]>('baiviet')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách bài viết: ', error)
        return []
    }
}

export const getBaiVietsByDoanhNghiep = async (id: number) => {
    try {
        const { data } = await authAxios.get<BaiViet[]>(`doanhnghiep/${id}/baiviet`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy bài viết của doanh nghiệp: ', error)
        return []
    }
}

export const getBaiVietsByUser = async (id: number) => {
    try {
        const { data } = await authAxios.get<BaiViet[]>(`baiviet/user/${id}`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy bài viết của user: ', error)
        return []
    }
}

export const getBaiViet = async (id: number) => {
    try {
        const { data } = await authAxios.get<BaiViet>(`baiviet/${id}/`)
        return data
    } catch (error) {
        console.log(`===> Lỗi lấy bài viết (${id}):`, error)
        return undefined
    }
}

export const getBinhLuans = async (id: number) => {
    try {
        const { data } = await axios.get<BinhLuanBaiViet[]>(`baiviet/${id}/binhluan`)
        return data
    } catch (error) {
        console.log(`===> Lỗi lấy bình luận bài viết (${id}):`, error)
        return []
    }
}

export const postBinhLuan = async (id: number, noiDung: string, binhLuanChaId?: number) => {
    try {
        const { data } = await authAxios.post<BinhLuanBaiViet[]>(`baiviet/${id}/binhluan`, { noiDung, binhLuanChaId })
        return data
    } catch (error) {
        console.log(`===> Lỗi đăng bình luận bài viết (${id}):`, error)
        return []
    }
}

export const deleteBaiViet = async (id: number) => {
    try {
        await authAxios.delete(`baiviet/${id}`)
        return true
    } catch (error) {
        console.log(`===> Lỗi xóa bài viết (${id}):`, error)
        return false
    }
}

export const createBaiViet = async (danhMucs: number[], noiDung: string, hinhAnhs: any[]) => {
    try {
        const formData = new FormData()
        formData.append(`noiDung`, noiDung)
        danhMucs.forEach(item => {
            formData.append(`danhMucs[]`, item?.toString())
        })
        hinhAnhs.forEach(item => {
            formData.append(`hinhAnhs[]`, item)
        })
        await authAxios.post('baiviet/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> ', error)
        console.log('===> Lỗi tạo bài viết: ', error)
        return false
    }
}

export const getDanhMucs = async () => {
    try {
        const { data } = await axios.get<DanhMucBaiViet[]>('danhmuc')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh mục bài viết: ', error)
        return []
    }
}

export const getDanhMuc = async (id: number) => {
    try {
        const { data } = await axios.get<DanhMucBaiViet>(`danhmuc/${id}`)
        return data
    } catch (error) {
        console.log(`===> Lỗi lấy danh mục (${id}):`, error)
        return undefined
    }
}

export const getBaiVietsByDanhMuc = async (id: number) => {
    try {
        const { data } = await authAxios.get<BaiViet[]>(`danhmuc/${id}/baiviet`)
        return data
    } catch (error) {
        console.log(`===> Lỗi lấy bài viết theo danh mục (${id}):`, error)
        return []
    }
}

export const postLikeBaiViet = async (id: number) => {
    try {
        const { data } = await authAxios.post(`baiviet/${id}/like`)
        return data
    } catch (error) {
        console.log(`===> Lỗi thích bài viết (${id}):`, error)
    }
}

export const getBaiVietBySearch = async (search: string) => {
    try {
        const { data } = await authAxios.get<BaiViet[]>(`baiviet/search`, {
            params: { search }
        })
        return data
    } catch (error) {
        console.log(`===> Lỗi tìm kiếm bài viết (${search}):`, error)
        return []
    }
}