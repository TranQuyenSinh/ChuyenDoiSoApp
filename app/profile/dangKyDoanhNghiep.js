import React, { useEffect, useLayoutEffect } from 'react'

import { useRouter, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { TabView, SceneMap } from 'react-native-tab-view'
import { Text, Image, Alert, Pressable, Dimensions, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { textStyles } from '@constants/Styles'
import background from '@assets/images/phieu1_bg.jpg'
import dangKySlice, { fetchTinhThanh } from '@redux/dangKySlice'
import DaiDienDoanhNghiepForm from '@components/DangKy/DaiDienDoanhNghiepForm'
import ThongTinDoanhNghiepForm from '@components/DangKy/ThongTinDoanhNghiepForm'
const { width, height } = Dimensions.get('screen')

const tabViewScene = [
    { key: 'formDN', title: 'Đăng ký thông tin doanh nghiệp' },
    { key: 'formDaiDienDN', title: 'Đăng ký thông tin đại diện doanh nghiệp' },
]
const DangKyDoanhNghiep = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const navigation = useNavigation()
    const { pageIndex } = useSelector(state => state.dangKy)
    const { setPageIndex } = dangKySlice.actions

    const handleChangeIndex = pageIndex => {
        dispatch(setPageIndex({ pageIndex }))
    }
    const handleBack = () => {
        if (pageIndex <= 0) {
            router.back()
        } else {
            handleChangeIndex(pageIndex - 1)
        }
    }

    useEffect(() => {
        dispatch(fetchTinhThanh())
    }, [])

    useEffect(() => {
        const event = navigation.addListener('beforeRemove', e => {
            e.preventDefault()
            Alert.alert('Xác nhận thoát đăng ký?', 'Bạn chưa hoàn tất quá trình đăng ký, xác nhận thoát?', [
                {
                    text: 'Thoát',
                    style: 'destructive',
                    onPress: () => navigation.dispatch(e.data.action),
                },
                { text: 'Tiếp tục đăng ký', style: 'cancel', onPress: () => {} },
            ])
        })
        return event
    }, [navigation])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])

    return (
        <>
            <Image style={styles.background} source={background} />
            <Pressable
                onPress={handleBack}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6, margin: 16, marginTop: 30 }}>
                <Ionicons name='chevron-back-outline' size={30} color={Colors.body} />
                <Text style={textStyles.medium}>{pageIndex <= 0 ? 'Thoát' : 'Về trang trước'}</Text>
            </Pressable>
            <TabView
                style={styles.container}
                navigationState={{ index: pageIndex, routes: tabViewScene }}
                renderScene={SceneMap({
                    formDN: ThongTinDoanhNghiepForm,
                    formDaiDienDN: DaiDienDoanhNghiepForm,
                })}
                swipeEnabled={true}
                renderTabBar={props => <></>}
                onIndexChange={handleChangeIndex}
                initialLayout={{ height: 0, width: Dimensions.get('window').width }}
            />
        </>
    )
}

export default DangKyDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        height,
        width,
        resizeMode: 'cover',
    },
})
