import { LinhVuc } from '@constants/CommonTypes/LinhVucType'

export interface ChuyenGia {
    id: string
    tenChuyenGia: string
    hinhAnh: string
    email: string
    sdt: string
    diaChi: string
    moTa: string
    linhVuc: LinhVuc
}
