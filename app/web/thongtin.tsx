import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
import Colors from '@constants/Colors'
const ThongTinWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            title: 'Cổng thông tin doanh nghiệp',
        })
    })
    return <WebView source={{ uri: 'https://thongtin.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default ThongTinWebView
