import React from 'react'
import { TextProps, StyleSheet, Text as RNText } from 'react-native'

interface Props extends TextProps {
    fontSize?: number
    color?: string
    fontWeight?: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    align?: 'center' | 'left' | 'right' | 'justify'
}

export const Text = (props: Props) => {
    const { fontWeight = 'normal', color = '#000', fontSize = 14, align = 'left', style, ...rest } = props

    const styles = StyleSheet.flatten([
        {
            textAlign: align,
            color,
            fontSize,
            fontWeight,
        },
        style,
    ])

    return <RNText {...rest} style={styles} />
}
