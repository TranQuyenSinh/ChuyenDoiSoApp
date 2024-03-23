import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'

const DacSanWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Đặc sản An Giang',
        })
    })
    return <WebView source={{ uri: 'https://dacsan.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default DacSanWebView
