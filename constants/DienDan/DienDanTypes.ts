import { User } from '@constants/CommonTypes/UserType'

export interface DanhMucBaiViet {
    id: number
    name: string
}

export interface BaiViet {
    id: number
    user: User
    luotXem: number
    noiDung: string
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
    createdAt: string
    noiDung: string
}
