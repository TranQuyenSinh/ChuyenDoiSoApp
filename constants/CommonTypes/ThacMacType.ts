import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { User } from './UserType'

export interface ThacMac {
    id: number
    noiDung: string
    user: User
    doanhNghiep?: DoanhNghiep
    traLoi?: string
    ngayTraLoi?: string
    createdAt: string
    updatedAt: string
}