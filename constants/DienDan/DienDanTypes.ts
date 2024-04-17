import { User } from '@constants/CommonTypes/UserType'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'

export interface DanhMucBaiViet {
    id: number
    name: string
}

export interface BaiViet {
    id: number
    user: User
    luotXem: number
    noiDung: string
    doanhNghiep: DoanhNghiep
    hinhAnhs?: AnhBaiViet[]
    luotThich: number
    danhMucs: DanhMucBaiViet[]
    isLike: boolean
    createdAt: string
}

export interface AnhBaiViet {
    id: number
    hinhAnh: string
}

export interface BinhLuanBaiViet {
    id: number
    user: User
    baiVietId: number
    createdAt: string
    noiDung: string
    phanHois: BinhLuanBaiViet[]
}
