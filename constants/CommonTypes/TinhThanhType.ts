export interface TinhThanh {
    [key: number]: any
    Id: string
    Name: string
    Districts: ThanhPho[]
}

export interface ThanhPho {
    Id: string
    Name: string
}
