import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useNavigation } from 'expo-router'
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import TryAgain from '@components/StatusPage/TryAgain'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import moment from 'moment'
import { AppDispatch, RootState } from '@redux/store'
import DatePicker from 'react-native-date-picker'
import useToggle from '@hooks/useToggle'

const DoanhNghiepInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const { isOpen, toggle } = useToggle()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)
    const [form, setForm] = useState({
        id: 0,
        tenTiengViet: '',
        tenTiengAnh: '',
        tenVietTat: '',
        ngayLap: new Date(),
        thanhPho: '',
        huyen: '',
        xa: '',
        diaChi: '',
        website: '',
        maThue: '',
        fax: '',
        soLuongNhanSu: 0,
        moTa: '',
        loaiHinh: '',
        // sdts: Sdt[]
    })

    useEffect(() => {
        if (!doanhNghiep) return
        setForm({
            id: doanhNghiep?.id,
            tenTiengViet: doanhNghiep?.tenTiengViet,
            tenTiengAnh: doanhNghiep?.tenTiengAnh,
            tenVietTat: doanhNghiep?.tenVietTat,
            ngayLap: new Date(doanhNghiep?.ngayLap),
            thanhPho: doanhNghiep?.thanhPho,
            huyen: doanhNghiep?.huyen,
            xa: doanhNghiep?.xa,
            diaChi: doanhNghiep?.diaChi,
            website: doanhNghiep?.website,
            maThue: doanhNghiep?.maThue,
            fax: doanhNghiep?.fax,
            soLuongNhanSu: doanhNghiep?.soLuongNhanSu,
            moTa: doanhNghiep?.moTa,
            loaiHinh: doanhNghiep?.loaiHinh?.id || '',
            // sdts: Sdt[])
        })
    }, [doanhNghiep])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Cập nhật doanh nghiệp',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}>
                {status === 'loading' && <Loading />}
                {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
                {status === 'success' && (
                    <>
                        <Text style={inputStyles.label}>Tên doanh nghiệp</Text>
                        <TextInput
                            value={form.tenTiengViet}
                            onChangeText={text => setForm({ ...form, tenTiengViet: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Tên tiếng anh</Text>
                        <TextInput
                            value={form.tenTiengAnh}
                            onChangeText={text => setForm({ ...form, tenTiengAnh: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Tên viết tắt</Text>
                        <TextInput
                            value={form.tenVietTat}
                            onChangeText={text => setForm({ ...form, tenVietTat: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Ngày hoạt động</Text>
                        <Text style={inputStyles.input} onPress={() => toggle(true)}>
                            {moment(form.ngayLap).format('DD/MM/YYYY')}
                        </Text>
                        <DatePicker
                            modal
                            minimumDate={moment(new Date()).subtract(100, 'days').toDate()}
                            maximumDate={new Date()}
                            mode='date'
                            open={isOpen}
                            date={new Date(form.ngayLap)}
                            cancelText='Hủy'
                            confirmText='Xác nhận'
                            title='Chọn ngày gieo'
                            onConfirm={date => {
                                toggle(false)
                                setForm({ ...form, ngayLap: date })
                            }}
                            onCancel={() => {
                                toggle(false)
                            }}
                        />

                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>Loại hình doanh nghiệp</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.loaiHinh?.tenLoaiHinh}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>Mã số thuế</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.maThue}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>Số lượng nhân sự</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.soLuongNhanSu}</Text>
                        </View>
                        <View style={[styles.item, styles.itemColumn]}>
                            <Text style={styles.itemTitle}>Mô tả</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.moTa}</Text>
                        </View>
                        <View style={[styles.item, styles.itemColumn]}>
                            <Text style={styles.itemTitle}>Địa chỉ</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.diaChi}</Text>
                        </View>
                        <View style={[styles.item, styles.itemColumn]}>
                            <Text style={styles.itemTitle}>Điện thoại</Text>
                            {doanhNghiep?.sdts.map(dt => (
                                <Text style={styles.itemText} key={dt.id}>
                                    - {dt.sdt} ({dt.loaiSdt})
                                </Text>
                            ))}
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>Fax</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.fax}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>Website</Text>
                            <Text style={styles.itemText}>{doanhNghiep?.website}</Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        // marginTop: 12,
        paddingHorizontal: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.bodyText,
    },
    itemColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        color: Colors.textGray,
    },
    imgCCCD: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 12,
    },
})
const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 6,
        marginHorizontal: 24,
        marginVertical: 12,
    },
    label: {
        fontWeight: '500',
        marginTop: 4,
    },
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.default,
        height: 40,
        marginTop: 0,
        paddingTop: 0,
    },
    button: {
        marginTop: 12,
    },
})

export default DoanhNghiepInfo
