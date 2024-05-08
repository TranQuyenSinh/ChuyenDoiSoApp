export interface User {
    id: number
    name: string
    email: string
    image?: string
    status: any
    vaitro: Role[]
}

export interface Role {
    id: string
    name: string
}
