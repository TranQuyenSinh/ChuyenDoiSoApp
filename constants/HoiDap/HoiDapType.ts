import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { User } from '@constants/CommonTypes/UserType'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'

export interface Message {
    id: number
    noiDung: string
    user: User
    createdAt: string
}

export interface Conversation {
    id: number
    doanhNghiep: DoanhNghiep
    chuyenGia: ChuyenGia
    tinNhans: Message[]
}
