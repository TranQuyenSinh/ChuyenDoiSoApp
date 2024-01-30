import { authAxios } from '@utils/axios'
import { toast } from '@utils/toast'

export const doiMatKhau = async (currentPassword, newPassword) => {
    try {
        const result = await authAxios.post('/api/account/change-password', { currentPassword, newPassword })
        return { result: true, message: 'Đổi mật khẩu thành công' }
    } catch (err) {
        const { code, message } = err.response?.data
        console.log('===> Đổi mật khẩu thất bại. Err: ', message)
        return { result: false, message }
    }
}

export const checkUserHasPassword = async () => {
    let { data } = await authAxios.get('/api/account/has-password')
    return data
}
