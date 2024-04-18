import { useMemo } from 'react'

export const useTinhThanh = (dataTinhThanh, form) => {
    const thanhPhoData = useMemo(
        () =>
            dataTinhThanh.map(item => ({
                value: item.value,
                label: item.label,
            })),
        [dataTinhThanh]
    )

    const huyenData = useMemo(() => {
        const thanhpho = form?.thanhPho

        const huyens = thanhpho ? dataTinhThanh.find(x => x.value === thanhpho.id)?.huyens : []
        return huyens?.map(h => ({ value: h.value, label: h.label }))
    }, [form?.thanhPho])

    const xaData = useMemo(() => {
        const thanhpho = form?.thanhPho
        const huyen = form?.huyen
        if (!thanhpho || !huyen) return []

        const huyens = dataTinhThanh.find(tp => tp.value === thanhpho.id)?.huyens || []
        const xas = huyens.find(h => h.value === huyen.id)?.xas || []
        return xas?.map(x => ({ value: x.value, label: x.label }))
    }, [form?.thanhPho, form?.huyen])

    return { thanhPhoData, huyenData, xaData }
}
