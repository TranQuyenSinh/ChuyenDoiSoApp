import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactComponentElement, ReactElement, ReactNode } from 'react'
import Colors from '@constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

interface ButtonProps {
    onPress: () => void
    text: string
    btnStyles?: ViewStyle
    textStyles?: TextStyle
    renderIcon?: ReactNode
    disabled?: boolean
}

const Button = ({ onPress, text, btnStyles, textStyles, renderIcon, disabled = false }: ButtonProps) => {
    return (
        <Pressable
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

interface GradienButtonProps extends ButtonProps {
    textStyles: ViewStyle
    colors: string[]
}

export const GradienButton = ({ onPress, text, btnStyles, textStyles, colors }: GradienButtonProps) => {
    return (
        <LinearGradient
            style={[gradientStyles.btn, btnStyles]}
            colors={colors || ['#7676e8', '#348AC7']}
            start={{ x: 0, y: 0 }}>
            <Pressable
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                onPress={onPress}>
                <Text style={[gradientStyles.text, textStyles]}>{text}</Text>
            </Pressable>
        </LinearGradient>
    )
}

export default Button

const styles = StyleSheet.create({
    defaultBtn: {
        backgroundColor: Colors.default,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
})

const gradientStyles = StyleSheet.create({
    btn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
})
