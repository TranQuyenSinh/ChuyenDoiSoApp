import { Conversation, Message } from '@constants/HoiDap/HoiDapType'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

export const fetchConversations = async () => {
    try {
        const { data } = await authAxios.get<Conversation[]>('/api/hoidap/hoithoai')
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
        const { data } = await authAxios.get<Message[]>('/api/hoidap/tinnhan', {
            params: { chuyenGiaId },
        })
        console.log('===> data: ', data)
        return data
    } catch (error) {
        const err = error as AxiosError
        // @ts-ignore
        console.log('===> error: ', err.message)
        return []
    }
}
