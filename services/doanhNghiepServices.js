import { authAxios } from '@utils/axios'

export const getLinhVuc = async () => {
    try {
        const { data } = await authAxios.get('/api/doanhnghiep/linhvuc')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy lĩnh vực doanh nghiệp')
        return []
    }
}

export const getLoaiHinhDN = async () => {
    try {
        const { data } = await authAxios.get('/api/doanhnghiep/loaihinh')
        return data
    } catch (err) {
        console.log('===> Lỗi lấy loại hình doanh nghiệp')
        console.log('===> err: ', err.message)
        return []
    }
}
