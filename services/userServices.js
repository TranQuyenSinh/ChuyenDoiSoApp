import { axios } from '@utils/axios'

export const dangKyUser = async userInfo => {
    try {
        await axios.post('/api/auth/register', userInfo)
    } catch (error) {
        let { code, message } = error.response?.data
        console.log('Lỗi đăng ký tài khoản: ', message)
        return Promise.reject({ code, message })
    }
}
