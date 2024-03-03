import { authAxios, axios } from '@utils/axios'
import { toast } from '@utils/toast'

export const getBinhLuanByTinTucId = async tinTucId => {
    try {
        let { data } = await authAxios.get('/api/binhluan', {
            params: { tinTucId },
        })
        return data
    } catch (err) {
        const message = err?.response?.data?.message || ''
        console.log('Lỗi lấy bình luận: ', message)
        return Promise.reject(message)
    }
}

export const themBinhLuan = async ({ noiDung, tinTucId, binhLuanChaId = null }) => {
    try {
        await authAxios.post('/api/binhluan', {
            noiDung,
            tinTucId,
            binhLuanChaId,
        })
    } catch (err) {
        console.log('Lỗi bình luận: ', err?.response?.data)
        toast('Gửi bình luận thất bại')
    }
}
