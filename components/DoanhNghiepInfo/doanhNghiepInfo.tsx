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
import { AppDispatch, RootState } from '@redux/store'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'

const DoanhNghiepInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {status === 'loading' && <Loading />}
            {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
            {status === 'success' && (
                <ScrollView style={dnStyles.contentContainer} showsVerticalScrollIndicator={false}>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Tên doanh nghiệp</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tenTiengViet}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Tên tiếng anh</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tenTiengAnh}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Tên viết tắt</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.tenVietTat}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Ngày hoạt động</Text>
                        <Text style={dnStyles.itemText}>
                            {doanhNghiep?.ngayLap && moment(doanhNghiep?.ngayLap).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Ngành nghề chính</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.nganhNghe?.tenNganhNghe}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Mã số thuế</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.maThue}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Số lượng nhân sự</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.soLuongNhanSu}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Mô tả</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.moTa}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Địa chỉ</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.diaChi}</Text>
                    </View>
                    <View style={[dnStyles.item, dnStyles.itemColumn]}>
                        <Text style={dnStyles.itemTitle}>Điện thoại</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.sdt}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Fax</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.fax}</Text>
                    </View>
                    <View style={dnStyles.item}>
                        <Text style={dnStyles.itemTitle}>Website</Text>
                        <Text style={dnStyles.itemText}>{doanhNghiep?.website}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default DoanhNghiepInfo
