import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
const KhaoSatWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Khảo sát doanh nghiệp',
        })
    })
    return <WebView source={{ uri: 'https://khaosat.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default KhaoSatWebView
