import React, { useEffect, useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import khaoSatSlice, { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import Seperator from '@components/View/Seperator'
import { textStyles } from '@constants/Styles'
import { khaoSatStyles } from '@components/KhaoSat/khaoSatStyles'

const ThongKeKhaoSat = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { khaoSats, loading } = useSelector((state: RootState) => state.khaoSat)

    useEffect(() => {
        dispatch(fetchDanhSachKhaoSat())
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <PageHeader title={'Thống kê'} />
            <ScrollView
                style={{ marginTop: 12 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: 16 }}>
                <Text style={[khaoSatStyles.title, { marginHorizontal: 0 }]}>Doanh nghiệp của bạn:</Text>
                {khaoSats.length > 0 && <DiemLineChart data={khaoSats.slice().sort((a, b) => b.id - a.id)} />}
                <Seperator style={{ marginBottom: 0 }} />
                <Text style={[khaoSatStyles.title, { marginHorizontal: 0 }]}>Tỉnh An Giang:</Text>

                <ThongKeCDSPieChart />
            </ScrollView>
        </View>
    )
}

export default ThongKeKhaoSat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
