import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { TinTuc } from '@constants/TinTuc/TinTucTypes'
import { axios } from '@utils/axios'

export const getLinhVucs = async () => {
    try {
        let { data } = await axios.get<LinhVuc>('/api/linhvuc')
        return data
    } catch (err) {
        // let { code, message } = err?.response?.data
        // console.error('Lỗi lấy lĩnh vục: ', message)
        return []
    }
}

export const getTinTucById = async (tinTucId: number) => {
    try {
        let { data } = await axios.get<TinTuc>(`/api/tintuc/${tinTucId}`)
        return data
    } catch (err) {
        console.log('===> err: ', err)
        // let { code, message } = err.response?.data
        // console.error('Lỗi lấy tin tức by id: ', message)
        throw err
    }
}

export const getTinTucByLinhVuc = async (linhVucId: string) => {
    try {
        let { data } = await axios.get<TinTuc>('/api/tintuc', {
            params: { linhvucid: linhVucId },
        })
        return data
    } catch (err) {
        // let { code, message } = err.response?.data
        // console.error('Lỗi lấy tin tức by lĩnh vực: ', message)
        return []
    }
}

export const timKiemTinTucByTuKhoa = async (tuKhoa: string) => {
    try {
        let { data } = await axios.get<TinTuc>('/api/tintuc', {
            params: { tukhoa: tuKhoa },
        })
        return data
    } catch (err) {
        // let { code, message } = err.response?.data
        // console.error('Lỗi tìm kiếm tin bằng từ khóa: ', message)
        return []
    }
}
