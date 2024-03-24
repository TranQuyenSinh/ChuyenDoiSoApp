import { Conversation, Message } from '@constants/HoiDap/HoiDapType'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

export const fetchConversations = async () => {
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

export const fetchMessages = async (chuyenGiaId: number) => {
    try {
        console.log('===> chuyenGiaId: ', chuyenGiaId)
        const { data } = await authAxios.get<Conversation>('hoidap/tinnhan', {
            params: { chuyenGiaId },
        })
        return data
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        console.log('===> error: ', err.message)
        return undefined
    }
}

export const sendMessage = async (message: string, hoiThoaiId: number) => {
    try {
        await authAxios.post('hoidap/tinnhan', {
            message,
            hoiThoaiId,
        })
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        console.log('===> error: ', err.message)
    }
}
