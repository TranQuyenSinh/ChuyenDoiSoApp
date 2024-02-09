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

export const doiAvatar = async ({ uri, type, name }) => {
    try {
        const formData = new FormData()
        formData.append('avatar', { uri, type, name })
        await authAxios.post('/api/account/change-avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return true
    } catch (error) {
        console.log('===> Error: ', JSON.stringify(error))
        console.log('===> Error: ', error)
        return false
    }
}
