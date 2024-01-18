import { axios } from '@utils/axios'

export const createOAuthPassword = async userInfo => {
    try {
        await axios.post('/api/auth/create-oauth-password', userInfo)
        return Promise.resolve()
    } catch (error) {
        console.log('error when creating OAuth password')
        // let { code, message } = error.response?.data
        // return Promise.reject({ code, message })
    }
}
