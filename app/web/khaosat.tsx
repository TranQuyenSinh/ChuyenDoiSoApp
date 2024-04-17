import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
import Colors from '@constants/Colors'
const KhaoSatWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            title: 'Khảo sát doanh nghiệp',
        })
    })
    return <WebView source={{ uri: 'https://khaosat.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default KhaoSatWebView
