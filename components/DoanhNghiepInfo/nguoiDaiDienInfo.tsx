import React, { useLayoutEffect, useMemo } from 'react'

import { useNavigation } from 'expo-router'
import { View, ScrollView, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import TryAgain from '@components/StatusPage/TryAgain'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import moment from 'moment'
import dnStyles from './dnStyles'
import { daiDienDoanhNghiepValidate } from '@validateSchemas/registerValidate'
import { AppDispatch, RootState } from '@redux/store'
const NguoiDaiDienInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)
    const daidien = useMemo(() => {
        return doanhNghiep?.daiDien
    }, [doanhNghiep])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {status === 'loading' && <Loading />}
            {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
            {status === 'success' && (
                <ScrollView style={dnStyles.contentContainer} showsVerticalScrollIndicator={false}>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Họ tên</Text>
                        <Text style={dnStyles.itemText}>{daidien?.tenDaiDien}</Text>
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
                        <Text style={dnStyles.itemText}>{daidien?.diaChi}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>CCCD</Text>
                        <Text style={dnStyles.itemText}>{daidien?.cccd}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Ảnh CCCD mặt trước</Text>
                        {daidien?.imgMatTruoc && (
                            <Image source={{ uri: daidien?.imgMatTruoc }} style={dnStyles.imgCCCD} />
                        )}
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Ảnh CCCD mặt sau</Text>
                        {daidien?.imgMatSau && <Image source={{ uri: daidien?.imgMatSau }} style={dnStyles.imgCCCD} />}
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Chức vụ</Text>
                        <Text style={dnStyles.itemText}>{daidien?.chucVu}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default NguoiDaiDienInfo
