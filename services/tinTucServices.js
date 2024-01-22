import { axios } from '@utils/axios'

export const getLinhVucs = async () => {
    try {
        let { data } = await axios.get('/api/tintuc/linh-vuc')
        return data
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi lấy lĩnh vục: ', message)
        return []
    }
}

export const getTinTucById = async tinTucId => {
    try {
        let { data } = await axios.get('/api/tintuc/tin-tuc', {
            params: { tinTucId },
        })
        return data
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi lấy tin tức by id: ', message)
        throw err
    }
}

export const getTinTucByLinhVuc = async linhVucId => {
    try {
        let { data } = await axios.get('/api/tintuc/tintuc-by-linhvuc', {
            params: { linhVucId },
        })
        return data
    } catch (err) {
        let { code, message } = err.response?.data
        console.error('Lỗi lấy tin tức by lĩnh vực: ', message)
        return []
    }
}
