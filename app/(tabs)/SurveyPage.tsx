import { useEffect, useLayoutEffect } from 'react'
import moment from 'moment'
import { Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useNavigation } from 'expo-router'
import { Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { textStyles } from '@constants/Styles'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import TabPageHeader from '@components/View/TabPageHeader'
import { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'
import no_survey from '@assets/images/survey.jpg'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { styles } from './survey'

export const SurveyPage = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { khaoSats, loading } = useSelector((state: RootState) => state.khaoSat)
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { doanhNghiep, status: doanhNghiepStatus } = useSelector((state: RootState) => state.doanhNghiep)
    useEffect(() => {
        dispatch(fetchDanhSachKhaoSat())
        dispatch(fetchDoanhNghiepInfo())
    }, [])

    useEffect(() => {
        console.log('===> khaoSats: ', khaoSats)
    }, [doanhNghiep])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (!isLoggedIn) {
        return <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />
    }

    if (loading) {
        return <Loading />
    }

    if (!loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={textStyles.medium}>Không tìm thấy doanh nghiệp</Text>
            </View>
        )
    }

    // return <Loading />
    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.container}>
            <TabPageHeader title={'Khảo sát doanh nghiệp'} />
            <Text style={[textStyles.medium, { paddingHorizontal: 16, marginTop: 6 }]}>
                {doanhNghiep?.tenTiengViet}
            </Text>
            {khaoSats && khaoSats?.length !== 0 && (
                <ScrollView contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                    {khaoSats?.map(item => (
                        <Pressable
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
            )}
            {!loading && khaoSats?.length === 0 && (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 16 }}>
                    <Image source={no_survey} style={{ width: 250, height: 250 }} />
                    <Text style={[textStyles.large, { textAlign: 'center' }]}>
                        Doanh nghiệp chưa thực hiện khảo sát nào
                    </Text>
                </View>
            )}
        </SafeAreaView>
    )
}
