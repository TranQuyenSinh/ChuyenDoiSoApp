import { BinhLuan } from '@constants/TinTuc/BinhLuanTypes'
import { authAxios, axios } from '@utils/axios'
import { toast } from '@utils/toast'

export const getBinhLuanByTinTucId = async (tinTucId: number) => {
    try {
        let { data } = await axios.get<BinhLuan[]>('binhluan', {
            params: { tinTucId },
        })
        return data
    } catch (err) {
        console.log('Lỗi lấy bình luận: ', err)
        return []
    }
}

export const themBinhLuan = async ({
    userId,
    noiDung,
    tinTucId,
    binhLuanChaId,
}: {
    userId?: number
    noiDung: string
    tinTucId: number
    binhLuanChaId?: number
}) => {
    try {
        await axios.post('binhluan', {
            userId,
            noiDung,
            tinTucId,
            binhLuanChaId,
        })
    } catch (err) {
        console.log('Lỗi bình luận: ', err)
        toast('Gửi bình luận thất bại')
    }
}
