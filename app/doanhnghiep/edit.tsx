import React, { useEffect, useLayoutEffect, useState } from 'react'

import { router, useNavigation } from 'expo-router'
import { StyleSheet, ScrollView, Text, KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import TryAgain from '@components/StatusPage/TryAgain'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import moment from 'moment'
import { AppDispatch, RootState } from '@redux/store'
import DatePicker from 'react-native-date-picker'
import useToggle from '@hooks/useToggle'
import { Dropdown } from 'react-native-element-dropdown'
import { getLoaiHinhDN, updateDoanhNghiep } from '@services/doanhNghiepServices'
import Button from '@components/View/Button'
import { toast } from '@utils/toast'

const DoanhNghiepInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const { isOpen, toggle } = useToggle()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)
    const [loading, setLoading] = useState(false)
    const [loaiHinhs, setLoaiHinhs] = useState<any[]>([])

    const [form, setForm] = useState({
        tenTiengViet: '',
        tenTiengAnh: '',
        tenVietTat: '',
        ngayLap: new Date(),
        diaChi: '',
        website: '',
        maThue: '',
        fax: '',
        soLuongNhanSu: '',
        moTa: '',
        loaiHinh: '',
        sdt: ''
    })

    const fetchData = async () => {
        const loaiHinhs = await getLoaiHinhDN()
        setLoaiHinhs(loaiHinhs.map(item => ({ value: item.id, label: item.tenLoaiHinh })))
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!doanhNghiep) return
        setForm({
            tenTiengViet: doanhNghiep?.tenTiengViet,
            tenTiengAnh: doanhNghiep?.tenTiengAnh,
            tenVietTat: doanhNghiep?.tenVietTat,
            ngayLap: doanhNghiep?.ngayLap ? new Date(doanhNghiep.ngayLap) : new Date(),
            diaChi: doanhNghiep?.diaChi,
            website: doanhNghiep?.website,
            maThue: doanhNghiep?.maThue,
            fax: doanhNghiep?.fax,
            soLuongNhanSu: doanhNghiep?.soLuongNhanSu ? doanhNghiep.soLuongNhanSu.toString() : '',
            moTa: doanhNghiep?.moTa,
            loaiHinh: doanhNghiep?.loaiHinh?.id || '',
            sdt: doanhNghiep?.sdt
        })
    }, [doanhNghiep])

    const handleSubmit = async () => {
        const isSuccess = await updateDoanhNghiep(form)
        if (isSuccess) {
            toast("Cập nhật thành công")
            dispatch(fetchDoanhNghiepInfo())
            router.back()
        }
    }

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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={30}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}>
                {(status === 'loading') && <Loading />}
                {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
                {status === 'success' && (
                    <>
                        <Text style={inputStyles.label}>Tên doanh nghiệp</Text>
                        <TextInput
                            value={form.tenTiengViet}
                            onChangeText={text => setForm({ ...form, tenTiengViet: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Tên tiếng anh</Text>
                        <TextInput
                            value={form.tenTiengAnh}
                            onChangeText={text => setForm({ ...form, tenTiengAnh: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Tên viết tắt</Text>
                        <TextInput
                            value={form.tenVietTat}
                            onChangeText={text => setForm({ ...form, tenVietTat: text })}
                            autoCapitalize='characters'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Ngày hoạt động</Text>
                        <Text style={{ marginTop: 6 }} onPress={() => toggle(true)}>
                            {moment(form.ngayLap).format('DD/MM/YYYY')}
                        </Text>
                        <DatePicker
                            modal
                            mode='date'
                            open={isOpen}
                            date={form.ngayLap}
                            dividerColor={Colors.default}
                            locale='vi-VN'
                            cancelText='Hủy'
                            confirmText='Xác nhận'
                            title='Chọn ngày lập'
                            onConfirm={date => {
                                toggle(false)
                                setForm({ ...form, ngayLap: date })
                            }}
                            onCancel={() => {
                                toggle(false)
                            }}
                        />

                        <Text style={inputStyles.label}>Loại hình doanh nghiệp</Text>
                        <Dropdown
                            style={inputStyles.input}
                            data={loaiHinhs}
                            placeholder='Loại hình doanh nghiệp'
                            search={false}
                            maxHeight={300}
                            labelField={'label'}
                            valueField={'value'}
                            value={loaiHinhs.find(item => item?.value === form?.loaiHinh)?.value}
                            onChange={(item: any) => {
                                setForm({ ...form, loaiHinh: item?.value })
                            }}
                            mode={'modal'}
                        />

                        <Text style={inputStyles.label}>Mã thuế</Text>
                        <TextInput
                            value={form.maThue}
                            onChangeText={text => setForm({ ...form, maThue: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Số lượng nhân sự</Text>
                        <TextInput
                            value={form.soLuongNhanSu}
                            onChangeText={text => setForm({ ...form, soLuongNhanSu: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Mô tả</Text>
                        <TextInput
                            value={form.moTa}
                            onChangeText={text => setForm({ ...form, moTa: text })}
                            numberOfLines={4}
                            multiline
                            style={[inputStyles.input, { height: 'auto' }]}
                            textAlignVertical='top'
                        />

                        <Text style={inputStyles.label}>Địa chỉ</Text>
                        <TextInput
                            value={form.diaChi}
                            onChangeText={text => setForm({ ...form, diaChi: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Điện thoại</Text>
                        <TextInput
                            value={form.sdt}
                            onChangeText={text => setForm({ ...form, sdt: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Fax</Text>
                        <TextInput
                            value={form.fax}
                            onChangeText={text => setForm({ ...form, fax: text })}
                            autoCapitalize='words'
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Website</Text>
                        <TextInput
                            autoCapitalize='none'
                            value={form.website}
                            onChangeText={text => setForm({ ...form, website: text })}
                            style={inputStyles.input}
                        />

                        <Button btnStyles={inputStyles.button} text='Cập nhật' onPress={handleSubmit} />
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
        marginTop: 16,
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
