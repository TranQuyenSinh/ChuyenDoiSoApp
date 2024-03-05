import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { MucDo } from '@constants/KhaoSat/MucDoType'
import { authAxios, axios } from '@utils/axios'

export const getKhaoSat = async () => {
    try {
        const { data } = await authAxios.get<KhaoSat>('api/danhgia')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy khảo sát doanh nghiệp: ', error)
        return undefined
    }
}

export const getMucDos = async () => {
    try {
        const { data } = await axios.get<MucDo[]>('/api/mucdo')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy mức độ chuyển đổi số: ', JSON.stringify(error))
        return []
    }
}
