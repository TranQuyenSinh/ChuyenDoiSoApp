import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatMessage } from '@constants/CommonTypes/ChatTypes'
import { useAppSelector } from '@redux/store'
import Colors from '@constants/Colors'
import moment from 'moment'
import Animated, { interpolate, Layout, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface ChatItemProps {
    message: ChatMessage
}

const ChatItem = (props: ChatItemProps) => {
    const { message } = props
    const { userProfile } = useAppSelector(state => state.user)
    const isHide = useSharedValue(0)
    const timeHideStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(isHide.value, [0, 1], [0, 20]),
        }
    })
    const toggleTime = () => {
        isHide.value = isHide.value === 0 ? withTiming(1) : withTiming(0)
    }

    let messageStyle = message.user_id === userProfile?.id ? styles.meMessage : styles.himMessage
    let textStyle = message.user_id === userProfile?.id ? styles.meText : styles.himText
    let timeStyle = message.user_id === userProfile?.id ? styles.timeMe : styles.timeHim
    return (
        <View style={styles.container}>
            <Pressable onPress={toggleTime} style={[styles.message, messageStyle]}>
                <Text selectable selectionColor={Colors.orange} style={textStyle}>
                    {message.message}
                </Text>
            </Pressable>
            <Animated.Text layout={Layout} style={[styles.time, timeStyle, timeHideStyle]}>
                {moment(message.created_at?.toDate()).format('HH:mm')}
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    message: {
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 10,
        maxWidth: '80%',
    },
    meText: {
        color: 'white',
    },
    himText: {
        color: 'black',
    },
    meMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007bff',
    },
    himMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f0f0',
    },
    time: {
        fontSize: 10,
        color: Colors.textGray,
        marginHorizontal: 16,
    },
    timeHim: {
        alignSelf: 'flex-start',
    },
    timeMe: {
        alignSelf: 'flex-end',
    },
})

export default ChatItem
