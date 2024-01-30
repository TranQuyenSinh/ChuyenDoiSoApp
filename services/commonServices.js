import axios from 'axios'

export const layTinhThanh = async () => {
    try {
        const { data } = await axios.get(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        )
        return data
    } catch (err) {
        console.log('===> Lỗi khi lấy tỉnh thành', err)
        return []
    }
}
