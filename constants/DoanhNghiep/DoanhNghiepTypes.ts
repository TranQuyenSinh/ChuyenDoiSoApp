import { DropdownItem } from '@constants/CommonTypes/DropdownType'
import { ThanhPho } from '@constants/CommonTypes/TinhThanhType'
import { string } from 'yup'

export interface DoanhNghiep {
    tentiengviet: string
    tentienganh: string
    tenviettat: string
    diachi: string
    thanhpho: any
    huyen: any
    xa: any
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
    thanhpho: string
    huyen: string
    xa: string
    cccd: string
    imgMattruoc: string
    imgMatsau: string
    chucvu: string
}
