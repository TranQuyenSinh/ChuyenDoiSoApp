import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { MucDo } from '@constants/KhaoSat/MucDoType'
import { authAxios, axios } from '@utils/axios'
import { AxiosError } from 'axios'

export const getKhaoSat = async () => {
    try {
        const { data } = await authAxios.get<KhaoSat>('api/khaosat?type=newest')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy khảo sát doanh nghiệp: ', JSON.stringify(error))
        return undefined
    }
}

export const getKhaoSats = async () => {
    try {
        const { data } = await authAxios.get<KhaoSat[]>('api/khaosat?type=all')
        return data
    } catch (error) {
        // @ts-ignore
        console.log('===> Lỗi lấy khảo sát doanh nghiệp: ', JSON.stringify(error))
        return []
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
