import { DoanhNghiep } from './DoanhNghiepTypes'

export interface SanPham {
    id: number
    tenSanPham: string
    gia: number
    moTa: string
    hinhAnhs: AnhSanPham[]
    createdAt: string
    updatedAt: string
    doanhNghiep?: DoanhNghiep
}

export interface AnhSanPham {
    id: number
    hinhAnh: string
}
