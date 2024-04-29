import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface SettingItemProps {
    onPress?: () => void
    text: string
    icon: ReactNode
}

const SettingItem = (props: SettingItemProps) => {
    const { text, icon, onPress } = props
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {icon}
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={18} color={'#394045'} />
        </Pressable>
    )
}

export const SettingSeperator = () => {
    return <View style={seperatorStyles.container} />
}

export default SettingItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 16,
    },
    icon: {
        flex: 1,
    },
    text: {
        color: '#353f48',
        fontWeight: '500',
        fontSize: 17,
    },
})
const seperatorStyles = StyleSheet.create({
    container: {
        height: 1,
        backgroundColor: '#dbdde0',
    },
})
