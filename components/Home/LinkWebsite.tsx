import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface LinkWebsiteProps {
    image: any
    text: string
    onPress: () => void
    backgroundColor: string
}

const LinkWebsite = (props: LinkWebsiteProps) => {
    const { image, text, backgroundColor, onPress } = props
    const localStyles = {
        backgroundColor: backgroundColor ?? 'grey',
    }
    return (
        <Pressable onPress={onPress} style={[styles.container, localStyles]}>
            <Image source={image} style={styles.image} />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default LinkWebsite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 12,
    },
    image: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
})
