import { User } from '@constants/CommonTypes/UserType'

export interface ThongBao {
    id: number
    tieuDe: string
    noiDung: string
    daXem: boolean
    loai: string
    loaiId: string
    user: User
    createdAt: string
    updatedAt: string

}