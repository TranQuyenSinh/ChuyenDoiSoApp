import { useEffect, useLayoutEffect } from 'react'

import moment from 'moment'
import { Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useNavigation } from 'expo-router'
import { Image, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { textStyles } from '@constants/Styles'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import TabPageHeader from '@components/View/TabPageHeader'
import { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'

//@ts-ignore
import no_survey from '@assets/images/survey.jpg'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import RequireLogin from '@components/StatusPage/RequireLogin'
import NotFound from '@components/StatusPage/NotFound'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import Seperator from '@components/View/Seperator'
import { StatusBar } from 'expo-status-bar'

const SurveyPage = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { khaoSats, loading } = useSelector((state: RootState) => state.khaoSat)
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { doanhNghiep, status: doanhNghiepStatus } = useSelector((state: RootState) => state.doanhNghiep)
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchDanhSachKhaoSat())
            dispatch(fetchDoanhNghiepInfo())
        }
    }, [isLoggedIn])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Kết quả khảo sát',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    if (!isLoggedIn) {
        return <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />
    }

    if (loading || doanhNghiepStatus === 'loading') {
        return <Loading />
    }

    if (!doanhNghiep) return <NotFound message='Lỗi, không tìm thấy doanh nghiệp' />

    if (!loading && khaoSats?.length === 0)
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 16 }}>
                <Image source={no_survey} style={{ width: 250, height: 250 }} />
                <Text style={[textStyles.large, { textAlign: 'center' }]}>
                    Doanh nghiệp chưa thực hiện khảo sát nào
                </Text>
                <StatusBar style='dark' />
            </View>
        )

    return (
        <View style={styles.container}>
            <Text style={[textStyles.title, { paddingHorizontal: 16 }]}>Các phiếu khảo sát của bạn</Text>
            <View style={[styles.sectionContainer, { flex: 1 }]}>
                <ScrollView
                    style={{ alignSelf: 'stretch' }}
                    contentContainerStyle={{ paddingBottom: 25 }}
                    showsVerticalScrollIndicator={false}>
                    {khaoSats?.map((item: KhaoSat) => (
                        <Pressable
                            android_ripple={{ color: 'grey' }}
                            key={item.id}
                            onPress={() => router.push(`/khaosat/${item.id}`)}
                            style={styles.itemContainer}>
                            <View style={styles.itemInfo}>
                                <View style={{ flex: 1, gap: 6 }}>
                                    <Text style={styles.title}>
                                        Khảo sát: #<Text style={{ color: Colors.default }}>{item.id}</Text>
                                    </Text>
                                    <Text style={styles.date}>
                                        <Text style={{ textTransform: 'capitalize' }}>
                                            {moment(item.createdAt).format('dddd, DD/MM/YYYY')}
                                        </Text>
                                    </Text>
                                </View>
                                <Text style={styles.score}>{item.tongDiem} điểm</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
    },
    sectionContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginHorizontal: 16,
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        elevation: 6,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: Colors.textGray,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default SurveyPage
