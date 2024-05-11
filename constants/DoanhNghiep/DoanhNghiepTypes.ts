import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { User } from '@constants/CommonTypes/UserType'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'

export interface DoanhNghiep {
    id: number
    tenTiengViet: string
    tenTiengAnh: string
    tenVietTat: string
    ngayLap: string
    thanhPho: number
    huyen: number
    xa: number
    diaChi: string
    website: string
    maThue: string
    fax?: any
    soLuongNhanSu: number
    moTa: string
    loaiHinh?: LoaiHinh
    linhVuc?: LinhVuc
    daiDien: DaiDienDoanhNghiep
    sdts: Sdt[]
    sdt: string
    user?: User
    nhuCau?: NhuCau[]
    khaoSat?: KhaoSat[]
    thanhTich?: ThanhTich[]
    hoiVien?: boolean
    hoSoNangLuc?: string
    namGiaNhap?: Date
    nganhNghe?: NganhNghe
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
    thanhPho: number
    huyen: number
    xa: number
    diaChi: string
    cccd: string
    imgMatTruoc: string
    imgMatSau: string
    chucVu: string
    moTa?: any
}

export interface LoaiHinh {
    id?: number
    tenLoaiHinh?: string
    hinhAnh?: string
    moTa?: string
}

export interface DienThoai {
    id: number
    sdt: string
    loaisdt: string
}

export interface NhuCau {
    id: number
    nhuCau: string
    caiThien: string
    createdAt: string
    updatedAt: string
}

export interface ThanhTich {
    id: number
    tenThanhTich: string
    hinhAnh: string
}

export interface NganhNghe {
    id: number
    tenNganhNghe: string
}