import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactComponentElement, ReactElement, ReactNode } from 'react'
import Colors from '@constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

interface ButtonProps {
    onPress: () => void
    text: string
    btnStyles?: ViewStyle | ViewStyle[]
    textStyles?: TextStyle
    renderIcon?: ReactNode
    disabled?: boolean
}

const Button = ({ onPress, text, btnStyles, textStyles, renderIcon, disabled = false }: ButtonProps) => {
    return (
        <Pressable
            android_ripple={{ color: 'white' }}
            style={[
                styles.defaultBtn,
                { flexDirection: 'row', gap: 6 },
                disabled && { backgroundColor: Colors.textGray },
                btnStyles,
            ]}
            onPress={!disabled ? onPress : undefined}>
            {renderIcon}
            <Text style={[styles.defaultText, textStyles]}>{text}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    defaultBtn: {
        backgroundColor: Colors.default,
        height: 35,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultText: {
        color: '#fff',
        fontFamily: 'mon-sb',
    },
})
