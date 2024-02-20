export interface HiepHoi {
    id: number
    tenTiengViet: string
    tenTiengAnh: string
    sdt: string
    diaChi?: string
    moTa?: string
    daiDien: DaiDienHiepHoi
}

export interface DaiDienHiepHoi {
    id: number
    tenDaiDien: string
    email: string
    sdt?: string
    moTa?: string
}
