import { authAxios } from '@utils/axios'

export const getKhaoSat = async () => {
    try {
        const { data } = await authAxios.get('api/khaosat')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy khảo sát doanh nghiệp: ', error)
        return undefined
    }
}
