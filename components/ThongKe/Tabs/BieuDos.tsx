import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getThongKeTaiKhoanCount } from '@services/thongKeServices'
import SoLuongDoanhNghiepTheoTinhChart from '@components/KhaoSat/ThongKe/SoLuongDoanhNghiepTheoTinhChart'
import ThongKeDNTheoLoaiHinh from '@components/KhaoSat/ThongKe/ThongKeKhaoSatTheoNganh'
import ThongKeTheoLinhVuc from '@components/KhaoSat/ThongKe/ThongKeTheoLinhVuc'
import RowComponent from '@components/View/RowComponent'
import Animated, { Layout, FadeIn, FadeInDown } from 'react-native-reanimated'
import { Skeleton } from 'moti/skeleton'
import SpaceComponent from '@components/View/SpaceComponent'

const BieuDos = () => {
    const [countData, setCountData] = useState<any>()
    useEffect(() => {
        ;(async () => {
            const data = await getThongKeTaiKhoanCount()
            setCountData(data)
        })()
    }, [])
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            {countData ? (
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
            ) : (
                <View>
                    <Text style={styles.title}>Tài khoản</Text>
                    <RowComponent styles={styles.countRow} justify='space-between'>
                        <View style={styles.countItem}>
                            <Skeleton colorMode='light' width={45} height={35} />
                            <SpaceComponent height={4} />
                            <Skeleton colorMode='light' width={60} height={20} />
                        </View>
                        <View style={styles.countItem}>
                            <Skeleton colorMode='light' width={45} height={35} />
                            <SpaceComponent height={4} />
                            <Skeleton colorMode='light' width={60} height={20} />
                        </View>
                        <View style={styles.countItem}>
                            <Skeleton colorMode='light' width={45} height={35} />
                            <SpaceComponent height={4} />
                            <Skeleton colorMode='light' width={60} height={20} />
                        </View>
                    </RowComponent>
                </View>
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

export default BieuDos
