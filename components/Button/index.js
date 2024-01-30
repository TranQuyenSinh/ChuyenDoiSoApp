import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/Colors'

const Button = ({ onPress, text, btnStyles, textStyles }) => {
    return (
        <Pressable style={[styles.defaultBtn, btnStyles]} onPress={onPress}>
            <Text style={[styles.defaultText, textStyles]}>{text}</Text>
        </Pressable>
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
