import React, { useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import TryAgain from '@components/StatusPage/TryAgain'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import moment from 'moment'
import dnStyles from './dnStyles'

const DoanhNghiepInfo = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { doanhNghiep, status } = useSelector(state => state.doanhNghiep)
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
                        <Text style={dnStyles.itemTitle}>Tên doanh nghiệp</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tentiengviet}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Tên tiếng anh</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tentienganh}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Tên viết tắt</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tenviettat}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Ngày hoạt động</Text>
                        <Text style={dnStyles.itemText}>{moment(doanhNghiep?.ngaylap).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Loại hình doanh nghiệp</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.loaihinh?.tenLoaiHinh}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Mã số thuế</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.mathue}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Số lượng nhân sự</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.soluongnhansu}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Mô tả</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.mota}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Địa chỉ</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.diachi}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Điện thoại</Text>
                        {doanhNghiep?.dienthoais.map(dt => (
                            <Text style={dnStyles.itemText} key={dt.id}>
                                - {dt.sdt} ({dt.loaisdt})
                            </Text>
                        ))}
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Fax</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.fax}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default DoanhNghiepInfo
