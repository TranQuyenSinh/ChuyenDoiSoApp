import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { MucDo } from './MucDoType'
import { MoHinh } from './MoHinhType'

export interface KhaoSat {
    id: number
    mucDo: MucDo
    moHinh: MoHinh
    chuyenGia?: ChuyenGia
    chuyenGiaDanhGia?: string
    chuyenGiaDeXuat?: string
    chuyenGiaDanhGiaAt?: string
    khaoSatCount?: number
}
