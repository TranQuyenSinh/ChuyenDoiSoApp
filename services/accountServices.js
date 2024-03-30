import { authAxios, thongtinAuthAxios } from '@utils/axios'
import { toast } from '@utils/toast'

export const doiMatKhau = async (currentPassword, newPassword) => {
    try {
        const result = await authAxios.post('taikhoan/changepassword', { currentPassword, newPassword })
        return { result: true, message: 'Đổi mật khẩu thành công' }
    } catch (err) {
        const error = err.response?.data?.error
        console.log('===> Đổi mật khẩu thất bại. Err: ', error)
        return { result: false, message: error }
    }
}

export const doiAvatar = async ({ uri, type, name }) => {
    try {
        const formData = new FormData()
        formData.append('avatar', { uri, type, name })
        await thongtinAuthAxios.post('taikhoan/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> error: ', error)
        return false
    }
}
