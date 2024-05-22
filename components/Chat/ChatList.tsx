import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { ChatMessage } from '@constants/CommonTypes/ChatTypes'
import { useAppSelector } from '@redux/store'
import Colors from '@constants/Colors'
import ChatItem from './ChatItem'

interface ChatListProps {
    messages: ChatMessage[]
}

const ChatList = (props: ChatListProps) => {
    const { messages } = props
    const flatListRef = useRef<FlatList>(null)

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id?.toString()}
            renderItem={({ item }) => <ChatItem message={item} />}
            style={styles.container}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

export default ChatList
