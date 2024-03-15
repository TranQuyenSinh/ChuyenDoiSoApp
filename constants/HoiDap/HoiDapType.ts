import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { User } from '@constants/CommonTypes/UserType'

export interface Message {
    id: number
    noiDung: string
    user: User
    createdAt: string
}

export interface Conversation {
    id: number
    doanhNghiep: User
    chuyenGia: User
}
