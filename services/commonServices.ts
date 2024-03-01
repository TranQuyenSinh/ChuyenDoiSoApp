import { ThanhPho } from '@constants/CommonTypes/TinhThanhType'
import axios from 'axios'

export const layTinhThanh = async () => {
    try {
        const { data } = await axios.get<ThanhPho[]>(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        )
        const thanhPhos = data?.map(thanhPho => {
            const huyens = thanhPho?.Districts?.map(huyen => {
                const xas = huyen?.Wards?.map(xa => {
                    return { id: xa.Id, value: xa.Id, label: xa.Name }
                })
                return { id: huyen.Id, value: huyen.Id, label: huyen.Name, xas }
            })
            return { id: thanhPho.Id, value: thanhPho.Id, label: thanhPho.Name, huyens }
        })
        return thanhPhos
    } catch (err) {
        console.log('===> Lỗi khi lấy tỉnh thành', err)
        return []
    }
}
