import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//@ts-ignore
import chevron_icon from '@assets/icons/chevron.jpg'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

type ChevronProps = {
    progress: Animated.SharedValue<number>
}

const Chevron = ({ progress }: ChevronProps) => {
    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotateX: `${progress.value * -180}deg` }],
    }))
    return (
        <Animated.View style={[styles.container, iconStyle]}>
            <Image source={chevron_icon} style={styles.chevron} />
        </Animated.View>
    )
}

export default Chevron

const styles = StyleSheet.create({
    container: {
        minWidth: 20,
    },
    chevron: {
        width: 16,
        height: 16,
    },
})
