export interface ThanhPho {
    [key: number]: any
    Id: string
    Name: string
    Districts: Huyen[]
}

export interface Huyen {
    [key: number]: any
    Id: string
    Name: string
    Wards: Xa[]
}

export interface Xa {
    Id: string
    Name: string
}
