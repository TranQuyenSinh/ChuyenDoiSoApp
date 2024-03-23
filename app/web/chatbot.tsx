import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { WebView } from 'react-native-webview'
const ChatBotWebView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat bot tư vấn chuyển đổi số',
        })
    })
    return <WebView source={{ uri: 'https://chatbot.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default ChatBotWebView
