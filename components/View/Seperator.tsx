import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { memo, useMemo } from 'react'
import Colors from '@constants/Colors'
import { getBackgroundColorAsync } from 'expo-system-ui'

type SeperatorProps = {
    color?: string
    style?: ViewStyle
}

const Seperator = ({ color = Colors.textGray, style }: SeperatorProps) => {
    return <View style={[styles.container, { backgroundColor: color }, style]} />
}

export default memo(Seperator)

const styles = StyleSheet.create({
    container: {
        margin: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.placeHolder,
    },
})
