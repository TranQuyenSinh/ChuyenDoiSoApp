import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ImageComponent from '@components/View/ImageComponent'
import { useAppDispatch, useAppSelector } from '@redux/store'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { addDoc } from 'firebase/firestore'
import { messageRef } from '@configs/firebaseConfig'

const ChatBottom = () => {
    const [text, setText] = useState('')
    const { userProfile } = useAppSelector(state => state.user)
    const { conversation } = useAppSelector(state => state.chat)
    const handleSendMessage = async () => {
        if (text.length === 0 || !conversation) return
        setText('')
        await addDoc(messageRef, {
            conversation_id: conversation?.conversation_id,
            user_id: conversation.user.id,
            message: text,
            created_at: new Date(),
        })
    }
    return (
        <View style={styles.container}>
            <ImageComponent uri={userProfile?.image} style={styles.image} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={text} onChangeText={text => setText(text)} placeholder='Aa.' />
            </View>
            <IconButton onPress={handleSendMessage}>
                <Ionicons name='send' size={20} color={text.length === 0 ? 'grey' : Colors.default} />
            </IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        flex: 1,
        borderRadius: 30,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        padding: 6,
    },
    input: {
        flex: 1,
        paddingHorizontal: 6,
    },
})

export default ChatBottom
