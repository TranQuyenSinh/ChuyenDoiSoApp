import { useState, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, Pressable, ScrollView } from 'react-native'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import MoHinh from '@components/KhaoSat/MoHinh'
import Seperator from '@components/View/Seperator'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import { getKhaoSat } from '@services/khaoSatServices'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import TabPageHeader from '@components/View/TabPageHeader'
import { textStyles, defaultStyles } from '@constants/Styles'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import ChuyenGiaDanhGia from '@components/KhaoSat/ChuyenGiaDanhGia'

const SurveyPage = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { doanhNghiep } = useSelector((state: RootState) => state.doanhNghiep)
    const [loading, setLoading] = useState(false)
    const [khaoSat, setKhaoSat] = useState<KhaoSat | undefined>()

    const fetchKhaoSat = async () => {
        setLoading(true)
        const data = await getKhaoSat()
        setKhaoSat(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchKhaoSat()
        dispatch(fetchDoanhNghiepInfo())
    }, [])

    if (!isLoggedIn) {
        return <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />
    }

    if (loading) {
        return <Loading />
    }

    if (!loading && !khaoSat) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={textStyles.medium}>Doanh nghiệp chưa thực hiện khảo sát nào</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Khảo sát doanh nghiệp'} />
                <Text style={[textStyles.medium, { paddingHorizontal: 16, marginTop: 6 }]}>
                    {doanhNghiep?.tenTiengViet}
                </Text>
                <Seperator />

                <View style={styles.boxsContainer}>
                    <Pressable
                        style={{ flex: 6 }}
                        onPress={() =>
                            router.push({
                                pathname: '/danhgia/mucdo',
                                params: { id: (khaoSat?.mucDo?.id || 0) - 1 },
                            })
                        }>
                        <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#4ee9f2', '#4ba0fa']} style={[styles.box]}>
                            <Text style={styles.boxTitle}>Mức độ CDS</Text>
                            <Text style={styles.boxNumber}>{khaoSat?.mucDo?.tenMucDo}</Text>
                            <Text style={styles.boxSub}>Xem chi tiết {'>'}</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable style={{ flex: 4 }} onPress={() => router.push('/danhgia/phieu1')}>
                        <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#38ef7d', '#15b175']} style={[styles.box]}>
                            <Text style={styles.boxTitle}>Đã thực hiện</Text>
                            <Text style={styles.boxNumber}>{khaoSat?.khaoSatCount} khảo sát</Text>
                            <Text style={styles.boxSub}>Xem tất cả {'>'}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                {khaoSat?.moHinh && <MoHinh data={khaoSat.moHinh} />}

                <ChuyenGiaDanhGia
                    chuyenGia={khaoSat?.chuyenGia}
                    danhGia={khaoSat?.chuyenGiaDanhGia}
                    deXuat={khaoSat?.chuyenGiaDeXuat}
                    danhGiaAt={khaoSat?.chuyenGiaDanhGiaAt}
                />

                {/* {isLoggedIn && (
                    <>
                    <Pressable onPress={() => router.push('/survey/1')} style={styles.itemContainer}>
                    <View style={styles.itemInfo}>
                    <View style={{ flex: 1, gap: 6 }}>
                    <Text style={styles.title}>
                    Khảo sát: #<Text style={{ color: Colors.default }}>1</Text>
                                    </Text>
                                    <Text style={styles.date}>
                                        <Text style={{ textTransform: 'capitalize' }}>
                                            {moment(new Date()).format('dddd, HH:mm, DD/MM/YYYY')}
                                        </Text>
                                    </Text>
                                </View>
                                <Text style={styles.score}>256 điểm</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
                            </View>
                        </Pressable>
                    </>
                )} */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    title: {
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 6,
    },
    boxsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 6,
    },
    box: {
        borderRadius: 18,
        padding: 12,
    },
    boxTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
    boxNumber: {
        color: Colors.white,
        fontWeight: '800',
        fontSize: 20,
    },
    boxSub: {
        color: Colors.white,
        alignSelf: 'flex-end',
        marginTop: 6,
    },
})

export default SurveyPage
