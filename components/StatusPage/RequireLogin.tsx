import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@constants/Styles'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface RequireLoginProps {
    message?: string
    redirectHref?: any
}

const RequireLogin = ({
    message = 'Đăng nhập để sử dụng chức năng này',
    redirectHref = 'auth/login',
}: RequireLoginProps) => {
    const router = useRouter()
    return (
        <View style={[defaultStyles.container, styles.container]}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>{message}</Text>
            <Pressable
                onPress={() => router.replace(redirectHref)}
                style={[defaultStyles.btn, { padding: 12, flexDirection: 'row', gap: 6, marginTop: 10 }]}>
                <Text style={defaultStyles.btnText}>Đăng nhập ngay</Text>
            </Pressable>
        </View>
    )
}

export default RequireLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
