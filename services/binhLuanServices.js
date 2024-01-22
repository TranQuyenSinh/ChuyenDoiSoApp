import { axios } from '@utils/axios'

export const getBinhLuanByTinTucId = async tinTucId => {
    try {
        console.log('===> fetch bl')
        let { data } = await axios.get('/api/binhluan', {
            params: { tinTucId },
        })
        console.log('===> fetch bl xong')
        return data
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi lấy bình luận: ', message)
        throw err
    }
}

export const themBinhLuan = async ({ noiDung, tinTucId, userId, binhLuanChaId = null }) => {
    try {
        console.log('===> POST data', JSON.stringify({ noiDung, tinTucId, userId, binhLuanChaId }))
        await axios.post('/api/binhluan', {
            noiDung,
            tinTucId,
            userId,
            binhLuanChaId,
        })
        console.log('===> them bl xong')
        return Promise.resolve()
    } catch (err) {
        console.log('===> Mã lỗi', JSON.stringify(err))
        let { code, message } = err.response?.data
        console.error('Lỗi bình luận: ', message)
        return Promise.reject()
    }
}
