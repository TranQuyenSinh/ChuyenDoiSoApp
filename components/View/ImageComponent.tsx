import { Image as RNImage, ImageProps, StyleSheet, ImageURISource, ImageStyle, DimensionValue } from 'react-native'
import React from 'react'
import { appImages } from '@constants/Images'
import { StyleProp } from 'react-native'
import Colors from '@constants/Colors'

interface ImageComponentProps {
    source?: ImageURISource
    style?: StyleProp<ImageStyle>
    uri?: string
    defaultSource?: number | ImageURISource
    width?: DimensionValue | undefined
    height?: DimensionValue | undefined
    radius?: number
    size?: number
    border?: boolean
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
}

const ImageComponent = (props: ImageComponentProps) => {
    const {
        uri,
        size,
        radius,
        border,
        style,
        source = appImages.notfound,
        defaultSource,
        width,
        height,
        resizeMode,
        ...rest
    } = props
    const imageSource = uri ? { uri } : defaultSource ? defaultSource : source
    const localStyles: ImageStyle = {
        width: size || width || '100%',
        height: size || height || undefined,
        resizeMode: resizeMode || 'cover',
        borderRadius: radius || 0,
        borderWidth: border ? 1 : 0,
        borderColor: Colors.border,
    }

    return <RNImage {...rest} source={imageSource} defaultSource={appImages.notfound} style={[localStyles, style]} />
}

export default ImageComponent
