import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
import Colors from '@constants/Colors'
const ChatBotWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            title: 'Chat bot tư vấn chuyển đổi số',
        })
    })
    return <WebView source={{ uri: 'https://chatbot.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default ChatBotWebView
