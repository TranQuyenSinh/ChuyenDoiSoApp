import { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native'
import { Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'
import MoHinh from '@components/KhaoSat/MoHinh'
import Seperator from '@components/View/Seperator'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import { getKhaoSat } from '@services/khaoSatServices'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import TabPageHeader from '@components/View/TabPageHeader'
import LichSuKhaoSat from '@components/KhaoSat/LichSuKhaoSat'
import KetQuaKhaoSat from '@components/KhaoSat/KetQuaKhaoSat'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import ChuyenGiaDanhGia from '@components/KhaoSat/ChuyenGiaDanhGia'

const SurveyPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { doanhNghiep, status: doanhNghiepStatus } = useSelector((state: RootState) => state.doanhNghiep)
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
    }, [doanhNghiep])

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchDoanhNghiepInfo())
        }
    }, [isLoggedIn])

    if (!isLoggedIn) {
        return <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />
    }

    if (loading) {
        return <Loading />
    }

    if (!loading && doanhNghiepStatus === 'error') {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={textStyles.medium}>Không tìm thấy doanh nghiệp</Text>
            </View>
        )
    }

    if (!loading && doanhNghiep && !khaoSat) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={textStyles.medium}>Doanh nghiệp chưa thực hiện khảo sát nào</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Khảo sát doanh nghiệp'} />
                <Text style={[textStyles.medium, { paddingHorizontal: 16, marginTop: 6 }]}>
                    {doanhNghiep?.tenTiengViet}
                </Text>
                <Seperator style={{ marginTop: 6 }} />

                {khaoSat?.mucDo && khaoSat.tongDiem && (
                    <KetQuaKhaoSat mucDo={khaoSat.mucDo} tongDiem={khaoSat.tongDiem} />
                )}

                {khaoSat?.moHinh && <MoHinh data={khaoSat.moHinh} />}

                <ChuyenGiaDanhGia
                    chuyenGia={khaoSat?.chuyenGia}
                    danhGia={khaoSat?.chuyenGiaDanhGia}
                    deXuat={khaoSat?.chuyenGiaDeXuat}
                    danhGiaAt={khaoSat?.chuyenGiaDanhGiaAt}
                />

                {khaoSat?.khaoSatCount && <LichSuKhaoSat count={khaoSat.khaoSatCount} />}
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
})

export default SurveyPage
