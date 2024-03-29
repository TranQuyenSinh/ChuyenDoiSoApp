import { useRef, useState, useEffect, useLayoutEffect } from 'react'

import { View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useNavigation } from 'expo-router'

import { fetchTinhThanh } from '@redux/dangKySlice'
import PageHeader from '@components/View/PageHeader'
import TaiKhoanForm from '@components/Register/TaiKhoanForm'
import { formStyles } from '@components/Register/formStyles'
import DaiDienDoanhNghiepForm from '@components/Register/DaiDienDoanhNghiepForm'
import ThongTinDoanhNghiepForm from '@components/Register/ThongTinDoanhNghiepForm'

const { width, height } = Dimensions.get('screen')

const Register = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const pageRef = useRef(null)

    const [pageIndex, setPageIndex] = useState(0)

    const handleNextPage = () => {
        pageRef.current?.setPage(pageIndex + 1)
    }

    const handleBackPage = () => {
        pageRef.current?.setPage(pageIndex - 1)
    }

    useEffect(() => {
        dispatch(fetchTinhThanh())
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
        })
    }, [navigation])
    return (
        <View style={[authStyles.container, formStyles.container]}>
            {/* TOP */}
            <PageHeader />
            <PagerView
                ref={pageRef}
                style={{ flex: 1 }}
                initialPage={pageIndex}
                onPageSelected={({ nativeEvent }) => setPageIndex(nativeEvent.position)}
                pageMargin={32}
                keyboardDismissMode={'on-drag'}
                scrollEnabled={false}>
                <View collapsable={false} style={styles.pageItem} key={1}>
                    <TaiKhoanForm onNextPage={handleNextPage} />
                </View>
                <View collapsable={false} style={styles.pageItem} key={2}>
                    <ThongTinDoanhNghiepForm onNextPage={handleNextPage} onBackPage={handleBackPage} />
                </View>
                <View collapsable={false} style={styles.pageItem} key={3}>
                    <DaiDienDoanhNghiepForm onBackPage={handleBackPage} />
                </View>
            </PagerView>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    pageItem: {
        width: '100%',
        height: '100%',
    },
    background: {
        position: 'absolute',
        height,
        width,
        resizeMode: 'cover',
    },
})
