import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { Conversation, Message } from '@constants/HoiDap/HoiDapType'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

export const getHoiThoais = async () => {
    try {
        const { data } = await authAxios.get<Conversation[]>('hoidap/hoithoai')
        return data
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        console.log('===> error: ', err?.response?.data?.error)
        return []
    }
}

export const getTinNhans = async (toUserId: number) => {
    try {
        const { data } = await authAxios.get<Conversation>('hoidap/tinnhan', {
            params: { toUserId },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy tin nhắns: ', (error as AxiosError).response)
        return undefined
    }
}

export const getTinNhansByHoiThoaiId = async (hoiThoaiId: number) => {
    try {
        const { data } = await authAxios.get<Conversation>('hoidap/gettinnhanbyhoithoai', {
            params: { hoiThoaiId },
        })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy tin nhắns by hội thoại id: ', (error as AxiosError).response)
        return undefined
    }
}

export const postTinNhan = async (message: string, hoiThoaiId: number) => {
    try {
        const { data } = await authAxios.post<Message>('hoidap/tinnhan', {
            message,
            hoiThoaiId,
        })
        return data
    } catch (error) {
        console.log('===> Lỗi gửi tin nhắns: ', (error as AxiosError).response)
        return undefined
    }
}

export const deleteHoiThoai = async (hoiThoaiId: number) => {
    try {
        await authAxios.delete(`hoidap/hoithoai/${hoiThoaiId}`)
        return true
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        console.log('===> error: ', err?.message)
        return false
    }
}

export const timKiemDNTuVan = async () => {
    try {
        const { data } = await authAxios.get<DoanhNghiep[]>('hoidap/timkiem')
        return data
    } catch (error) {
        console.log('===> Lỗi tìm kiếm doanh nghiệp tư vấn: ', (error as AxiosError).response);
        return []
    }
}