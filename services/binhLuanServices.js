import { axios } from '@utils/axios'

export const getBinhLuanByTinTucId = async tinTucId => {
    try {
        let { data } = await axios.get('/api/binhluan', {
            params: { tinTucId },
        })
        return data
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi lấy bình luận: ', message)
        throw err
    }
}

export const themBinhLuan = async ({ noiDung, tinTucId, userId, binhLuanChaId = null }) => {
    try {
        await axios.post('/api/binhluan', {
            noiDung,
            tinTucId,
            userId,
            binhLuanChaId,
        })
        return Promise.resolve()
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi bình luận: ', message)
        return Promise.reject()
    }
}
