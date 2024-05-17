import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Text } from './Text'
import Colors from '@constants/Colors'

interface LinkComponentProps {
    text: string
    onPress: () => void
}

const LinkComponent = (props: LinkComponentProps) => {
    const { text, onPress } = props
    return (
        <Pressable onPress={onPress}>
            <Text color={Colors.default}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default LinkComponent
