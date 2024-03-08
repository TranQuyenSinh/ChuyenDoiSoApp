import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { khaoSatStyles } from './khaoSatStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
//@ts-ignore
import thongke_icon from '@assets/icons/thongke.png'
type LichSuKhaoSatProps = {
    count: number
}

const LichSuKhaoSat = ({ count }: LichSuKhaoSatProps) => {
    const router = useRouter()
    return (
        <>
            <Text style={khaoSatStyles.title}>Lịch sử khảo sát</Text>
            <View style={khaoSatStyles.boxsContainer}>
                <Pressable style={{ flex: 1 }} onPress={() => router.push('/khaosat/listKhaoSat')}>
                    <LinearGradient
                        start={{ x: 0, y: 0.2 }}
                        colors={['#e3a405', '#bf900d']}
                        style={[khaoSatStyles.box]}>
                        <Text style={khaoSatStyles.boxTitle}>Đã thực hiện</Text>
                        <Text style={khaoSatStyles.boxNumber}>{count} khảo sát</Text>
                        <Text style={khaoSatStyles.boxSub}>Xem tất cả {'>'}</Text>
                    </LinearGradient>
                </Pressable>
                <Pressable style={{ flex: 1 }} onPress={() => router.push('/khaosat/thongKe')}>
                    <LinearGradient
                        start={{ x: 0, y: 0.2 }}
                        colors={['#0d8dbf', '#782fed']}
                        style={[khaoSatStyles.box, { alignItems: 'center', justifyContent: 'center' }]}>
                        <Image source={thongke_icon} style={styles.image} />
                        <Text style={khaoSatStyles.boxNumber}>Xem thống kê</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </>
    )
}

export default LichSuKhaoSat

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.2,
    },
})
