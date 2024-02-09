import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Colors from '@constants/Colors'

const NguoiDaiDien = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <View style={{ backgroundColor: Colors.background.default }}>
            <PageHeader title={'Người đại diện doanh nghiệp'} />
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
        </View>
    )
}

export default NguoiDaiDien

const styles = StyleSheet.create({})
