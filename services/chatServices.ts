import { User } from '@constants/CommonTypes/UserType'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { authAxios } from '@utils/axios'
import { AxiosError } from 'axios'

export const getAllConversations = async () => {
    try {
        const { data } = await authAxios.get<Conversation[]>('chat/conversations')
        return data
    } catch (error) {
        console.log('===> Lỗi lấy danh sách conversation: ', (error as AxiosError).response)
        return []
    }

}

export const getConversationId = async (toUserId: number) => {
    try {
        const { data } = await authAxios.get('chat/conversation', { params: { toUserId } })
        return data
    } catch (error) {
        console.log('===> Lỗi lấy convesation id: ', (error as AxiosError).response)
        return undefined
    }
}

export const deleteConversation = async (conversationId: number) => {
    try {
        await authAxios.delete(`chat/conversation/${conversationId}`)
        return true
    } catch (error) {
        console.log('===> Lỗi xóa conversation: ', (error as AxiosError).response)
        return false
    }
}