import { ThanhPho } from '@constants/CommonTypes/TinhThanhType'
import { Slide } from '@constants/TinTuc/SlideType'
import { ThuVien } from '@constants/TinTuc/ThuVienTypes'
import { Video } from '@constants/TinTuc/VideoType'
import { axios } from '@utils/axios'

export const layTinhThanh = async () => {
    try {
        const { data } = await axios.get<ThanhPho[]>(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        )
        // const thanhPhos = data?.map(thanhPho => {
        //     const huyens = thanhPho?.Districts?.map(huyen => {
        //         const xas = huyen?.Wards?.map(xa => {
        //             return { id: xa.Id, value: xa.Id, label: xa.Name }
        //         })
        //         return { id: huyen.Id, value: huyen.Id, label: huyen.Name, xas }
        //     })
        //     return { id: thanhPho.Id, value: thanhPho.Id, label: thanhPho.Name, huyens }
        // })
        const tp: { id: string, value: string, label: string }[] = []
        const h: { id: string, value: string, label: string, parentId: string }[] = []
        const x: { id: string, value: string, label: string, parentId: string }[] = []
        data?.map(itemTp => {
            tp.push({ id: itemTp.Id, value: itemTp.Id, label: itemTp.Name })
            itemTp.Districts?.map(itemHuyen => {
                h.push({ id: itemHuyen.Id, value: itemHuyen.Id, label: itemHuyen.Name, parentId: itemTp.Id })
                itemHuyen.Wards?.map(itemXa => {
                    x.push({ id: itemXa.Id, value: itemXa.Id, label: itemXa.Name, parentId: itemHuyen.Id })
                })
            })
        })
        return { thanhPhos: tp, huyens: h, xas: x }
        // return thanhPhos
    } catch (err) {
        console.log('===> Lỗi khi lấy tỉnh thành', err)
        return []
    }
}

export const getSlides = async () => {
    try {
        const { data } = await axios.get<Slide[]>('tintuc/slide')
        return data
    } catch (error) {
        console.log('===> error: ', error)
        return []
    }
}

export const getVideos = async () => {
    try {
        const { data } = await axios.get<Video[]>('tintuc/video')
        return data
    } catch (error) {
        console.log('===> error: ', error)
        return []
    }
}

export const getThuViens = async (loai: number) => {
    try {
        const { data } = await axios.get<ThuVien[]>('tintuc/thuvien', {
            params: { loai },
        })
        return data
    } catch (error) {
        console.log('===> error: ', error)
        return []
    }
}

export const getThuVien = async (id: number) => {
    try {
        const { data } = await axios.get<ThuVien>('tintuc/thuvien', {
            params: { id },
        })
        return data
    } catch (error) {
        console.log('===> error: ', error)
        return undefined
    }
}
