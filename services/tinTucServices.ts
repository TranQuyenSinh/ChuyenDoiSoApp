import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { TinTuc } from '@constants/TinTuc/TinTucTypes'
import { axios } from '@utils/axios'

export const getLinhVucs = async () => {
    try {
        let { data } = await axios.get<LinhVuc>('linhvuc')
        return data
    } catch (err) {
        return []
    }
}

export const getTinTucById = async (tinTucId: number) => {
    try {
        let { data } = await axios.get<TinTuc>(`tintuc/detail?id=13`, {
            params: { id: tinTucId },
        })
        return data
    } catch (err) {
        console.log('===> err: ', err)
        throw err
    }
}

export const getTinTucByLinhVuc = async (linhVucId: string) => {
    try {
        let { data } = await axios.get<TinTuc>('tintuc/index', {
            params: { linhVucId },
        })
        return data
    } catch (err) {
        return []
    }
}

export const timKiemTinTucByTuKhoa = async (tuKhoa: string) => {
    try {
        let { data } = await axios.get<TinTuc>('tintuc/index', {
            params: { tuKhoa },
        })
        return data
    } catch (err) {
        return []
    }
}

export const getTinTucXemNhieu = async () => {
    try {
        let { data } = await axios.get<TinTuc[]>(`tintuc/index`, {
            params: { type: 'xem-nhieu' },
        })
        return data
    } catch (err) {
        console.log('===> Lỗi lấy tin xem nhiều: ', err)
        return []
    }
}

export const getTinTucLienQuan = async (id: number) => {
    try {
        let { data } = await axios.get<TinTuc[]>(`tintuc/index`, {
            params: {
                type: 'lien-quan',
                tinTucId: id,
            },
        })
        return data
    } catch (err) {
        console.log('===> Lỗi lấy tin liên quan: ', err)
        return []
    }
}
