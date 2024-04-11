import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '@constants/Colors'

type PageHeaderProps = {
    title?: string
    style?: ViewStyle
    textStyle?: TextStyle | TextStyle[]
    rightItem?: ReactNode
    tintColor?: string
}

const PageHeader = ({ title, style, rightItem, tintColor, textStyle }: PageHeaderProps) => {
    const router = useRouter()
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.headerArrow} onPress={() => router.back()}>
                <Ionicons name='chevron-back-outline' size={24} color={tintColor || Colors.bodyText} />
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: tintColor || Colors.bodyText }, textStyle]}>{title}</Text>
            {rightItem && <View style={styles.headerRight}>{rightItem}</View>}
        </View>
    )
}

export default PageHeader

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 40,
        backgroundColor: 'transparent',
    },
    headerArrow: {
        zIndex: 10,
        width: 'auto',
        position: 'absolute',
        paddingHorizontal: 6,
    },
    headerRight: {
        zIndex: 10,
        width: 'auto',
        position: 'absolute',
        right: 6,
        paddingHorizontal: 6,
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
})
