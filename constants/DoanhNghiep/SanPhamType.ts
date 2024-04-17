import { DoanhNghiep } from './DoanhNghiepTypes'

export interface SanPham {
    id: number
    tenSanPham: string
    gia: number
    moTa: string
    doanhNghiep: DoanhNghiep
    hinhAnhs: AnhSanPham[]
    createdAt: string
    updatedAt: string
}

export interface AnhSanPham {
    id: number
    hinhAnh: string
}
