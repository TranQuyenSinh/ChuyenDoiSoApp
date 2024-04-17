import { User } from '@constants/CommonTypes/UserType'

export interface DoanhNghiep {
    id: number
    tenTiengViet: string
    tenTiengAnh: string
    tenVietTat: string
    ngayLap: string
    thanhPho: string
    huyen: string
    xa: string
    diaChi: string
    website: string
    maThue: string
    fax?: any
    soLuongNhanSu: number
    moTa: string
    loaiHinh: LoaiHinh
    daiDien: DaiDienDoanhNghiep
    sdts: Sdt[]
    user?: User
}

export interface Sdt {
    id: number
    loaiSdt: string
    sdt: string
}

export interface DaiDienDoanhNghiep {
    id: number
    tenDaiDien: string
    email: string
    sdt: string
    thanhPho: string
    huyen: string
    xa: string
    diaChi: string
    cccd: string
    imgMatTruoc: string
    imgMatSau: string
    chucVu: string
    moTa?: any
}

export interface LoaiHinh {
    id?: string
    tenLoaiHinh?: string
    hinhAnh?: string
    moTa?: string
}

export interface DienThoai {
    id: string
    sdt: string
    loaisdt: string
}
