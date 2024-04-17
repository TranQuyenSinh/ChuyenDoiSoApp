import { Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const BackgroundImage = ({ source, blurRadius = 0 }: any) => {
    return (
        <ImageBackground blurRadius={blurRadius} source={source} style={[StyleSheet.absoluteFill, styles.background]} />
    )
}

export default BackgroundImage

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
})
