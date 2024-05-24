import { User } from './UserType'

export interface ThacMac {
    id: number
    noiDung: string
    user: User
    traLoi?: string
    ngayTraLoi?: string
    createdAt: string
    updatedAt: string
}