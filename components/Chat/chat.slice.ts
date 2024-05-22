import { User } from '@constants/CommonTypes/UserType';
import { createSlice } from '@reduxjs/toolkit'
type SliceState = {
    user?: User
    conversation?: { conversation_id: number, toUser: User, user: User }
}

const initialState: SliceState = {
    user: undefined,
    conversation: undefined
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUser: (state, { payload }: { payload: User }) => {
            state.user = payload
        },
        setConversation: (state, { payload }: { payload: { conversation_id: number, toUser: User, user: User } }) => {
            state.conversation = payload
        }
    },
})

export const { actions: chatActions } = chatSlice

export default chatSlice
