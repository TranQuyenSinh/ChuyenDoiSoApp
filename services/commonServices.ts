import { TinhThanh } from '@constants/CommonTypes/TinhThanhType'
import axios from 'axios'

export const layTinhThanh = async () => {
    try {
        const { data } = await axios.get<TinhThanh[]>(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        )
        const tinhs = data?.map(tinh => {
            const thanhPhos = tinh?.Districts?.map(thanhPho => ({
                id: thanhPho.Id,
                value: thanhPho.Name,
                label: thanhPho.Name,
            }))
            return { id: tinh.Id, value: tinh.Name, label: tinh.Name, thanhPhos }
        })
        return tinhs
    } catch (err) {
        console.log('===> Lỗi khi lấy tỉnh thành', err)
        return []
    }
}
