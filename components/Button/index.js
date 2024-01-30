import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({ onPress, text, btnStyles, textStyles }) => {
    return (
        <Pressable style={[styles.defaultBtn, btnStyles]} onPress={onPress}>
            <Text style={[styles.defaultText, textStyles]}>{text}</Text>
        </Pressable>
    )
}

export const GradienButton = ({ onPress, text, btnStyles, textStyles, colors }) => {
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
        fontWeight: 500,
    },
})
