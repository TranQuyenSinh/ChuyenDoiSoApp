import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation } from 'expo-router'
//@ts-ignore
import background from '@assets/backgrounds/trungtam.jpg'
//@ts-ignore
import logo from '@assets/images/logo_trungtam.png'
import TrungTamCarousel from '@components/TrungTam/Carousel'
import PagerView from 'react-native-pager-view'
import { screenHeight } from '@utils/window'
import NhiemVu from '@components/TrungTam/NhiemVu'
import DichVu from '@components/TrungTam/DichVu'
import ChuongTrinhDaoTao from '@components/TrungTam/ChuongTrinhDaoTao'
import LienHe from '@components/TrungTam/LienHe'
const TrungTamTinHoc = () => {
    const navigation = useNavigation()
    const scrollRef = useRef<PagerView>(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />
            <Image source={logo} style={styles.image} />
            {/* <TrungTamCarousel /> */}
            <PagerView
                orientation={'vertical'}
                ref={scrollRef}
                style={{ flex: 1, height: screenHeight }}
                initialPage={0}
                keyboardDismissMode={'none'}
                scrollEnabled={true}>
                <DichVu />
                <ChuongTrinhDaoTao />
                <NhiemVu />
                <LienHe />
            </PagerView>
            <StatusBar barStyle={'light-content'} />
        </SafeAreaView>
    )
}

export default TrungTamTinHoc

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    image: {
        marginTop: 20,
        alignSelf: 'center',
        width: '90%',
        height: 80,
        resizeMode: 'contain',
    },
})
