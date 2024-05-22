import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundImage from '@components/View/BackgroundImage'
import PageHeader from '@components/View/PageHeader'
import { appImages } from '@constants/Images'
import { Stack } from 'expo-router'
import Colors from '@constants/Colors'
import RowComponent from '@components/View/RowComponent'
import SoLuongDoanhNghiepTheoTinhChart from '@components/KhaoSat/ThongKe/SoLuongDoanhNghiepTheoTinhChart'
import ThongKeDNTheoLoaiHinh from '@components/KhaoSat/ThongKe/ThongKeKhaoSatTheoNganh'
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated'
import ThongKeTheoLinhVuc from '@components/KhaoSat/ThongKe/ThongKeTheoLinhVuc'
import { getThongKeTaiKhoanCount } from '@services/thongKeServices'

const ThongKePage = () => {
    const [countData, setCountData] = useState<any>()
    useEffect(() => {
        ;(async () => {
            const data = await getThongKeTaiKhoanCount()
            setCountData(data)
        })()
    }, [])
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='transparent' />

            {/* Top */}
            <View>
                <BackgroundImage blurRadius={7} source={appImages.thongke_bg} />
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Thống kê dữ liệu</Text>
                </View>
            </View>

            {countData && (
                <Animated.View layout={Layout} entering={FadeIn.duration(800)}>
                    <Text style={styles.title}>Tài khoản</Text>
                    <RowComponent styles={styles.countRow} justify='space-between'>
                        <View style={styles.countItem}>
                            <Text style={styles.countNumber}>{countData.doanhNghiep}</Text>
                            <Text style={styles.countText}>Doanh nghiệp</Text>
                        </View>
                        <View style={styles.countItem}>
                            <Text style={styles.countNumber}>{countData.hoiVien}</Text>
                            <Text style={styles.countText}>Hội viên</Text>
                        </View>
                        <View style={styles.countItem}>
                            <Text style={styles.countNumber}>{countData.chuyenGia}</Text>
                            <Text style={styles.countText}>Chuyên gia</Text>
                        </View>
                    </RowComponent>
                </Animated.View>
            )}

            <Animated.View layout={Layout} entering={FadeInDown.duration(800)} style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Phân bố doanh nghiệp theo huyện</Text>
                <SoLuongDoanhNghiepTheoTinhChart />
            </Animated.View>

            <Animated.View layout={Layout} entering={FadeInDown.duration(800)} style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Phân bố doanh nghiệp theo loại hình kinh doanh</Text>
                <ThongKeDNTheoLoaiHinh />
            </Animated.View>

            <Animated.View layout={Layout} entering={FadeInDown.duration(800)} style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Phân bố doanh nghiệp theo lĩnh vực</Text>
                <ThongKeTheoLinhVuc />
            </Animated.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        paddingHorizontal: 14,
        marginTop: 24,
        marginBottom: 12,
        textAlign: 'left',
        width: '100%',
    },
    countRow: {
        marginHorizontal: 24,
    },
    countItem: {
        alignItems: 'center',
    },
    countNumber: {
        fontSize: 24,
        fontFamily: 'mon-b',
    },
    countText: {},
})

const topStyles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 24,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 4 },
    },
})

export default ThongKePage
