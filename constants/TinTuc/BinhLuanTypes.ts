import { NumericDictionary } from 'lodash'

export interface BinhLuan {
    id: number
    noiDung: string
    hoTen: string
    avatar?: string
    phanHois?: BinhLuan[]
    createdAt: string
}
