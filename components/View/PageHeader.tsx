import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '@constants/Colors'

type PageHeaderProps = {
    title?: string
    style?: ViewStyle
}

const PageHeader = ({ title, style }: PageHeaderProps) => {
    const router = useRouter()
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.headerArrow} onPress={() => router.back()}>
                <Ionicons name='chevron-back-outline' size={24} color={Colors.bodyText} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
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
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
})
