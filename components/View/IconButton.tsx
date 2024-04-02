import React, { PropsWithChildren } from 'react'

import { View, Pressable, StyleSheet } from 'react-native'

interface Props extends PropsWithChildren {
    onPress?: () => void
}

const IconButton = (props: Props) => {
    const { children, onPress } = props
    return (
        <View style={styles.btnWrapper}>
            <Pressable
                android_ripple={{ color: 'gray', borderless: true, foreground: true }}
                onPress={onPress}
                style={styles.btnContainer}>
                {children}
            </Pressable>
        </View>
    )
}

export default IconButton

const styles = StyleSheet.create({
    btnWrapper: {
        borderRadius: 12,
    },
    btnContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
})
