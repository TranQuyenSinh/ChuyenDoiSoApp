import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { setWith } from 'lodash'
import Colors from '@constants/Colors'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import { AppDispatch, RootState } from '@redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import RadarChart from '@components/KhaoSat/ThongKe/RadarChart'

const TopSumary = () => {
    const [index, setIndex] = useState(0)
    const { khaoSats } = useSelector((state: RootState) => state.khaoSat)
    const dispatch = useDispatch<AppDispatch>()

    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchDanhSachKhaoSat())
            dispatch(fetchDoanhNghiepInfo())
        }
    }, [isLoggedIn])

    const lastestKhaoSat = useMemo(() => {
        return khaoSats?.slice?.()?.reverse()?.[0]
    }, [khaoSats])

    return (
        <View style={styles.container}>
            <View style={switchStyles.container}>
                <Pressable
                    onPress={() => setIndex(0)}
                    style={[switchStyles.item, index === 0 && switchStyles.itemActive]}>
                    <Text style={[switchStyles.text, index === 0 && switchStyles.textActive]}>Doanh nghiệp</Text>
                </Pressable>
                <Pressable
                    onPress={() => setIndex(1)}
                    style={[switchStyles.item, index === 1 && switchStyles.itemActive]}>
                    <Text style={[switchStyles.text, index === 1 && switchStyles.textActive]}>Toàn tỉnh</Text>
                </Pressable>
            </View>
            <View style={chartStyles.container}>
                {index === 0 && khaoSats && khaoSats.length !== 0 && (
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{ marginBottom: 12 }}
                        contentContainerStyle={{ paddingHorizontal: 12, alignItems: 'center', gap: 12 }}>
                        <View style={chartStyles.item}>
                            <Text style={chartStyles.title}>Điểm từng đợt khảo sát</Text>
                            <DiemLineChart />
                        </View>
                        <View style={chartStyles.item}>
                            <Text style={chartStyles.title}></Text>
                            <RadarChart data={lastestKhaoSat} />
                        </View>
                    </ScrollView>
                )}
                {index === 1 && (
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{ marginBottom: 12 }}
                        contentContainerStyle={{ paddingHorizontal: 12 }}>
                        <View style={chartStyles.item}>
                            <Text style={chartStyles.title}>Tỷ lệ mức độ sãn sàng chuyển đổi số tỉnh An Giang</Text>
                            <ThongKeCDSPieChart />
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

export default TopSumary

const switchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 4,
        borderRadius: 30,
        marginHorizontal: 12,
        marginBottom: 12,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 6,
        backgroundColor: 'transparent',
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
    },
    itemActive: {
        backgroundColor: 'white',
    },
    textActive: {
        fontWeight: 'bold',
        color: Colors.default,
    },
})

const chartStyles = StyleSheet.create({
    container: {},
    item: {
        // backgroundColor: 'white',
        borderRadius: 20,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 12,
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 3,
    },
})

const styles = StyleSheet.create({
    container: {},
})
