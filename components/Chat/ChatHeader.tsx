import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RowComponent from '@components/View/RowComponent'
import { appIcons, appImages } from '@constants/Images'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { User } from '@constants/CommonTypes/UserType'
import ImageComponent from '@components/View/ImageComponent'
import { useAppSelector } from '@redux/store'
import { router } from 'expo-router'

const ChatHeader = () => {
    const { conversation } = useAppSelector(state => state.chat)
    return (
        <SafeAreaView style={styles.container}>
            <IconButton onPress={() => router.back()}>
                <Ionicons name='arrow-back-sharp' size={24} color={Colors.default} />
            </IconButton>
            <Text numberOfLines={1} style={styles.name}>
                {conversation?.toUser?.name}
            </Text>
            <ImageComponent uri={conversation?.toUser?.image} style={styles.avatar} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 80,
        gap: 10,
        paddingHorizontal: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        borderColor: '#a2a2a2',
        borderWidth: StyleSheet.hairlineWidth,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
})

export default ChatHeader
