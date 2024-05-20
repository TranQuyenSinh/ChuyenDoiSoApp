import { TKSoLuongDN } from '@constants/ThongKe/ThongKeTypes';
import { axios } from '@utils/axios';



export const getThongKeTaiKhoanCount = async () => {
    try {
        const { data } = await axios.get(`thongke/taikhoan`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thống kê số lượng tài khoản: ');
        return []
    }
}

export const getThongKeTheoLinhVuc = async () => {
    try {
        const { data } = await axios.get(`thongke/doanhnghieptheolinhvuc`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thống kê số lượng dn theo lĩnh vực: ');
        return []
    }
}

export const getThongKeSoLuongDoanhNghiepTheoHuyen = async () => {
    try {
        const { data } = await axios.get<TKSoLuongDN[]>(`thongke/soluongdoanhnghiep`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thống kê số lượng dn theo huyện: ');
        return []
    }
}

export const getThongKeMucDoTheoHuyen = async () => {
    try {
        const { data } = await axios.get(`thongke/mucdotheohuyen`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thống kê mức độ theo huyện: ');
        return undefined
    }
}

export const getThongKeDNTheoLoaiHinh = async () => {
    try {
        const { data } = await axios.get(`thongke/doanhnghieptheoloaihinh`)
        return data
    } catch (error) {
        console.log('===> Lỗi lấy thống kê dn theo loại hình: ');
        return undefined
    }
}