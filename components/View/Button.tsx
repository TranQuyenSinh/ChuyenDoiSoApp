import { Easing, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import Colors from '@constants/Colors'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface ButtonProps {
    onPress: () => void
    text: string
    btnStyles?: ViewStyle | ViewStyle[]
    textStyles?: TextStyle
    renderIcon?: ReactNode
    disabled?: boolean
}

const Button = ({ onPress, text, btnStyles, textStyles, renderIcon, disabled = false }: ButtonProps) => {
    const scale = useSharedValue(0)
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(scale.value, [0, 0.5, 1], [1, 0.99, 0.98]) }],
    }))

    const onPressIn = () => {
        scale.value = 1
    }

    const onPressOut = () => {
        scale.value = 0
    }
    return (
        <AnimatedPressable
            android_ripple={{ color: 'white' }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                styles.defaultBtn,
                { flexDirection: 'row', gap: 6 },
                disabled && { backgroundColor: Colors.textGray },
                btnStyles,
                animatedStyle,
            ]}
            onPress={!disabled ? onPress : undefined}>
            {renderIcon}
            <Text style={[styles.defaultText, textStyles]}>{text}</Text>
        </AnimatedPressable>
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
        fontWeight: '500',
        // fontFamily: 'mon-sb',
    },
})
