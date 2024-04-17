import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import WebView from 'react-native-webview'
import { useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import Colors from '@constants/Colors'

const index = () => {
    const navigation = useNavigation()
    const { selectedChuongTrinh } = useSelector((state: RootState) => state.trungTam)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            title: selectedChuongTrinh?.name,
        })
    }, [selectedChuongTrinh])
    return <WebView source={{ uri: selectedChuongTrinh?.link || 'https://dacsan.cdsdnag.com' }} style={{ flex: 1 }} />
}

export default index

const styles = StyleSheet.create({})
