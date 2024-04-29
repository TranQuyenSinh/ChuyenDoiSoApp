import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

interface ProfileTopButtonProps {
    text: string
    icon: ReactNode
    onPress?: () => void
}

const ProfileTopButton = (props: ProfileTopButtonProps) => {
    const { text, icon, onPress } = props
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.iconWrapper}>{icon}</View>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default ProfileTopButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
    },
    iconWrapper: {
        borderRadius: 50,
        backgroundColor: '#f6f7ff',
        padding: 8,
    },
    text: {
        textAlign: 'center',
    },
})
