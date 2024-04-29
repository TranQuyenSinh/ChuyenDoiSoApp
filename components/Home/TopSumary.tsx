import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
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
//@ts-ignore
import star from '@assets/icons/home/star.png'

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
        return khaoSats?.[0]
    }, [khaoSats])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
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
                {lastestKhaoSat?.mucDo?.tenMucDo && (
                    <View style={switchStyles.mucDo}>
                        <Image source={star} style={switchStyles.iconStar} />
                        <Text style={switchStyles.mucDoText}>
                            {lastestKhaoSat?.mucDo?.tenMucDo.replace(/Mức \d - /g, '')}
                        </Text>
                    </View>
                )}
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
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 4,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 12,
    },
    itemActive: {
        backgroundColor: 'white',
    },
    textActive: {
        fontWeight: 'bold',
        color: Colors.default,
    },
    // Mức độ
    mucDo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 30,
        padding: 4,
        paddingHorizontal: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.3)',
        // maxWidth: 150,
    },
    iconStar: {
        width: 20,
        height: 20,
    },
    mucDoText: {
        color: 'white',
        flexShrink: 1,
        fontSize: 12,
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
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 12,
    },
})
