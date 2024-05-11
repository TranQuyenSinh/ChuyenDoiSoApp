import { Image as RNImage, ImageProps, StyleSheet, ImageURISource, ImageStyle, DimensionValue } from 'react-native'
import React from 'react'
import { appImages } from '@constants/Images'
import { StyleProp } from 'react-native'

interface ImageComponentProps {
    source?: ImageURISource
    style?: StyleProp<ImageStyle>
    uri?: string
    defaultSource?: number | ImageURISource
    width?: DimensionValue | undefined
    height?: DimensionValue | undefined
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
}

const ImageComponent = (props: ImageComponentProps) => {
    const { uri, style, source = appImages.notfound, defaultSource, width, height, resizeMode, ...rest } = props
    const imageSource = uri ? { uri } : defaultSource ? defaultSource : source
    const localStyles: ImageStyle = {
        width: width ?? '100%',
        height: height ?? undefined,
        resizeMode: resizeMode ?? 'cover',
        aspectRatio: 1,
    }

    return <RNImage {...rest} source={imageSource} defaultSource={appImages.notfound} style={[localStyles, style]} />
}

export default ImageComponent
