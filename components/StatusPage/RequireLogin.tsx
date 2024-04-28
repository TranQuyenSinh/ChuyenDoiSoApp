import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@constants/Styles'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@components/View/Button'

interface RequireLoginProps {
    message?: string
    redirectHref?: any
    tintColor?: string
}

const RequireLogin = ({
    message = 'Đăng nhập để sử dụng chức năng này',
    redirectHref = 'auth/login',
    tintColor = '#000',
}: RequireLoginProps) => {
    const router = useRouter()
    return (
        <View style={[defaultStyles.container, styles.container]}>
            <Text style={[styles.messageText, { color: tintColor }]}>{message}</Text>
            <Button btnStyles={{ marginTop: 12 }} text={'Đăng nhập ngay'} onPress={() => router.push(redirectHref)} />
        </View>
    )
}

export default RequireLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        width: '70%',
        fontFamily: 'mon-sb',
        textAlign: 'center',
        fontSize: 18,
    },
})
