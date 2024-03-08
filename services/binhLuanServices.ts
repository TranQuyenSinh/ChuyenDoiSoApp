import { BinhLuan } from '@constants/TinTuc/BinhLuanTypes'
import { authAxios, axios } from '@utils/axios'
import { toast } from '@utils/toast'

export const getBinhLuanByTinTucId = async (tinTucId: number) => {
    try {
        let { data } = await authAxios.get<BinhLuan[]>('/api/binhluan', {
            params: { tinTucId },
        })
        return data
    } catch (err) {
        console.log('Lỗi lấy bình luận: ', err)
        return []
    }
}

export const themBinhLuan = async ({
    noiDung,
    tinTucId,
    binhLuanChaId,
}: {
    noiDung: string
    tinTucId: number
    binhLuanChaId?: number
}) => {
    try {
        await authAxios.post('/api/binhluan', {
            noiDung,
            tinTucId,
            binhLuanChaId,
        })
    } catch (err) {
        console.log('Lỗi bình luận: ', err)
        toast('Gửi bình luận thất bại')
    }
}
