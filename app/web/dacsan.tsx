import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
import Colors from '@constants/Colors'

const DacSanWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            title: 'Đặc sản An Giang',
        })
    })
    return <WebView source={{ uri: 'https://dacsan.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default DacSanWebView
