import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { db, messageRef } from '@configs/firebaseConfig'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import ChatHeader from '@components/Chat/ChatHeader'
import { StatusBar } from 'expo-status-bar'
import { User } from '@constants/CommonTypes/UserType'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { getConversationId } from '@services/chatServices'
import { ChatMessage } from '@constants/CommonTypes/ChatTypes'
import ChatList from '@components/Chat/ChatList'
import ChatBottom from '@components/Chat/ChatBottom'
import { chatActions } from '@components/Chat/chat.slice'

const ChatDetail = () => {
    const { id } = useLocalSearchParams()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const dispatch = useAppDispatch()
    const { conversation } = useAppSelector(state => state.chat)

    useLayoutEffect(() => {
        setMessages([])
        ;(async () => {
            const conversationData = await getConversationId(+id)
            dispatch(chatActions.setConversation(conversationData))
        })()
    }, [id])

    useEffect(() => {
        ;(async () => {
            if (!conversation) return
            let messageQuery = query(messageRef, where('conversation_id', '==', conversation.conversation_id))
            const unsub = onSnapshot(messageQuery, snapshot => {
                const messages = snapshot.docs
                    .map(doc => {
                        return { id: doc.id, ...doc.data() } as ChatMessage
                    })
                    .sort((a, b) => a.created_at.toDate().getTime() - b.created_at.toDate().getTime())
                setMessages(messages)
            })
            return unsub
        })()
    }, [conversation])

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='white' style='dark' />
            <ChatHeader />
            <ChatList messages={messages} />
            <ChatBottom />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

export default ChatDetail
