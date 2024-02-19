import React, { useLayoutEffect, useMemo } from 'react'

import { useNavigation } from 'expo-router'
import { View, dnStylesheet, ScrollView, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import TryAgain from '@components/StatusPage/TryAgain'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import moment from 'moment'
import dnStyles from './dnStyles'
import { daiDienDoanhNghiepValidate } from '@validateSchemas/registerValidate'
const NguoiDaiDienInfo = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { doanhNghiep, status } = useSelector(state => state.doanhNghiep)
    const daidien = useMemo(() => {
        return doanhNghiep?.daidien
    }, [doanhNghiep])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {status === 'loading' && <Loading />}
            {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
            {status === 'success' && (
                <ScrollView style={dnStyles.contentContainer} showsVerticalScrollIndicator={false}>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Họ tên</Text>
                        <Text style={dnStyles.itemText}>{daidien?.tendaidien}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Email</Text>
                        <Text style={dnStyles.itemText}>{daidien?.email}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Điện thoại</Text>
                        <Text style={dnStyles.itemText}>{daidien?.sdt}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Địa chỉ</Text>
                        <Text style={dnStyles.itemText}>{daidien?.diachi}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>CCCD</Text>
                        <Text style={dnStyles.itemText}>{daidien?.cccd}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Ảnh CCCD mặt trước</Text>
                        <Image source={{ uri: daidien?.imgMattruoc }} style={dnStyles.imgCCCD} />
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Ảnh CCCD mặt sau</Text>
                        <Image source={{ uri: daidien?.imgMatsau }} style={dnStyles.imgCCCD} />
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Chức vụ</Text>
                        <Text style={dnStyles.itemText}>{daidien?.chucvu}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default NguoiDaiDienInfo
