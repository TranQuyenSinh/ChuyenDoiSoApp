import React from 'react'
import type { StyleProp, ViewStyle, ImageURISource, ImageSourcePropType } from 'react-native'
import { StyleSheet, View, ActivityIndicator, Text, Image } from 'react-native'

interface Props {
    style?: StyleProp<ViewStyle>
    index?: number
    showIndex?: boolean
    img?: string
}

export const SBImageItem: React.FC<Props> = ({ style, index: _index, img }) => {
    const index = _index ?? 0

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size='small' />
            <Image key={index} style={styles.image} source={{ uri: img }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        width: '100%',
        aspectRatio: 3,
        position: 'absolute',
        borderRadius: 20,
    },
})
