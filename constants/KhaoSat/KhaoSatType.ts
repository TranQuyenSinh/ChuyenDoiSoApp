import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { MucDo } from './MucDoType'
import { MoHinh } from './MoHinhType'
import { KetQuaTruCot } from './KetQuaTruCot'

export interface KhaoSat {
    id: number
    mucDo: MucDo
    moHinh: MoHinh
    chuyenGia?: ChuyenGia
    chuyenGiaDanhGia?: string
    chuyenGiaDeXuat?: string
    chuyenGiaDanhGiaAt?: string
    tongDiem: number
    createdAt: string
    khaoSatCount?: number
    ketQuaTruCots: KetQuaTruCot[]
}
