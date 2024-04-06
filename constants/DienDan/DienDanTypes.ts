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
    hinhAnhs?: string[]
    luotThich: number
    danhMucs: DanhMucBaiViet[]
    createdAt: string
}

export interface BinhLuanBaiViet {
    id: number
    user: User
    createdAt: string
    noiDung: string
}
