import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { User } from '@constants/CommonTypes/UserType'

export interface ChuyenGia {
    id: string
    tenChuyenGia: string
    hinhAnh: string
    email: string
    sdt: string
    diaChi: string
    moTa: string
    chucVu: string
    namKinhNghiem: string
    trinhDo: string
    linhVuc: LinhVuc
    user: User
    hocTaps: ChuyenGiaHocTap[]
    congTacs: ChuyenGiaCongTac[]
    kinhNghiems: ChuyenGiaKinhNghiem[]
}

export interface ChuyenGiaHocTap {
    id: number
    tenBang: string
    loaiBang: string
    thoiGian: string
    tenTruong: string
    createdAt: string
    updatedAt: string
}

export interface ChuyenGiaKinhNghiem {
    id: number
    tenDuAn: string
    thoiGian: string
    moTa: string
    ketQua: string
    createdAt: string
    updatedAt: string
}

export interface ChuyenGiaCongTac {
    id: number
    donVi: string
    thoiGian: string
    viTri: string
    moTa: string
    createdAt: string
    updatedAt: string
}