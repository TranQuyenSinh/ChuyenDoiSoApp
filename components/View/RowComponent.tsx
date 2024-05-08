import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet } from 'react-native'

interface Props extends PropsWithChildren {
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
    styles?: StyleProp<ViewStyle>
    onPress?: () => void
    gap?: number
}

const RowComponent = (props: Props) => {
    const { justify, children, styles, onPress, gap } = props

    const localStyle = [
        localStyles.container,
        {
            justifyContent: justify ?? 'center',
            gap: gap ?? 0,
        },
        styles,
    ]
    return onPress ? (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={localStyle}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyle}>{children}</View>
    )
}

export default RowComponent

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})
