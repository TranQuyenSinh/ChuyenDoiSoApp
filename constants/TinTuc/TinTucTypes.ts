import { LinhVuc } from '@constants/CommonTypes/LinhVucType'

export interface TinTuc {
    id: number
    tieuDe: string
    noiDung: string
    tomTat: string
    hinhAnh?: string
    tacGia: string
    linhVuc: LinhVuc
    luotXem: number
    createdAt?: Date | string
}
