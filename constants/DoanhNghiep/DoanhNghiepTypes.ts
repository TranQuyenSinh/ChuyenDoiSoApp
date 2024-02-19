import { DropdownItem } from '@constants/CommonTypes/DropdownType'
import { ThanhPho, TinhThanh } from '@constants/CommonTypes/TinhThanhType'
import { string } from 'yup'

export interface DoanhNghiep {
    tentiengviet: string
    tentienganh: string
    tenviettat: string
    diachi: string
    tinh: any
    thanhpho: any
    mathue: string
    fax: string
    soluongnhansu: string
    ngaylap: string
    mota: string
    trangthai: string
    loaihinh: (LoaiHinh & DropdownItem) | undefined
    dienthoais: DienThoai[]
    daidien: DaiDienDoanhNghiep
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

export interface DaiDienDoanhNghiep {
    id: string
    tendaidien: string
    email: string
    sdt: string
    diachi: string
    cccd: string
    imgMattruoc: string
    imgMatsau: string
    chucvu: string
}
