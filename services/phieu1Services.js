import { authAxios, axios } from '@utils/axios'

export const layPhieuDanhGia1 = async () => {
    try {
        const { data } = await authAxios.get('phieudanhgia1')
        const scores = []
        const tieuchi = data.map((tieuChiC1, index) => {
            const c1 = {
                stt: index + 1,
                id: tieuChiC1.id,
                noiDung: tieuChiC1.noiDung,
                diemToiDa: tieuChiC1.diemToiDa,
            }
            c1.tieuChiCons = tieuChiC1.tieuChiCons.map((tieuChiC2, index2) => {
                const c2 = {
                    stt: `${index + 1}.${index2 + 1}`,
                    id: tieuChiC2.id,
                    noiDung: tieuChiC2.noiDung,
                    diemToiDa: tieuChiC2.diemToiDa,
                }
                let index3 = 0
                c2.tieuChiCons = tieuChiC2.tieuChiCons.map((tieuChiC0, index0) => {
                    const c0 = {
                        id: tieuChiC0.id,
                        noiDung: tieuChiC0.noiDung,
                    }
                    c0.tieuChiCons = tieuChiC0.tieuChiCons.map(tieuChiC3 => {
                        const c3 = {
                            stt: `${index + 1}.${index2 + 1}.${++index3}`,
                            id: tieuChiC3.id,
                            noiDung: tieuChiC3.noiDung,
                            heSoDiem: tieuChiC3.heSoDiem,
                        }
                        c3.cauHois = tieuChiC3.cauHois.map((cauHoi, indexCH) => {
                            return { id: cauHoi.id, noiDung: cauHoi.noiDung }
                        })

                        scores.push({ id: tieuChiC3.id, score: 0 })
                        return c3
                    })

                    return c0
                })

                return c2
            })

            return c1
        })
        return { tieuchi, scores }
    } catch (err) {
        console.log('===> Lỗi lấy phiếu đánh giá 1', JSON.stringify(err))
        return { tieuchi: [], scores: [] }
    }
}

export const themDanhGia = async scores => {
    try {
        const { data } = await authAxios.post('phieudanhgia1', { scores })
        return data
    } catch (err) {
        console.error('===> Lỗi khi thêm đánh giá', JSON.stringify(err))
    }
}
