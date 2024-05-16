import { useRouter } from 'expo-router'
import { Text, View, Pressable, StyleSheet, ViewStyle } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@constants/Styles'
import { ReactNode } from 'react'

interface NotFoundProps {
    containerStyle?: ViewStyle | ViewStyle[]
    message: string
    btnText?: string
    onPress?: () => void
    isShownBtn?: boolean
    renderIcon?: () => ReactNode
    redirectHref?: any
}

export default function NotFound({
    containerStyle = {},
    message = 'Có lỗi xảy ra',
    btnText = 'Vể trang chủ',
    renderIcon,
    onPress,
    isShownBtn = false,
    redirectHref = '(tabs)',
}: NotFoundProps) {
    const router = useRouter()
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>{message}</Text>
            {isShownBtn && (
                <Pressable onPress={() => router.replace(redirectHref)} style={styles.button}>
                    {renderIcon && renderIcon()}
                    <Text style={defaultStyles.btnText}>{btnText}</Text>
                </Pressable>
            )}
            {onPress && (
                <Pressable onPress={onPress} style={styles.button}>
                    {renderIcon && renderIcon()}
                    <Text style={defaultStyles.btnText}>{btnText}</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
    button: {
        backgroundColor: Colors.default,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 24,
        flexDirection: 'row',
        gap: 6,
        marginTop: 10,
    },
})
