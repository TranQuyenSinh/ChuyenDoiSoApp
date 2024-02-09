import React, { useState, useEffect, useLayoutEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigation } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { View, Pressable, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import Button from '@components/Button'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@components/StatusPage/Loading'
import PageHeader from '@components/View/PageHeader'
import { layTinhThanh } from '@services/commonServices'
import { DateSelect } from '@components/Input/DatePicker'
import DropdownComponent from '@components/Input/Dropdown'
import { DropdownItem } from '@constants/CommonTypes/DropdownType'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import TextInputBox, { TextAreaInputBox } from '@components/Input/InputBox'
import { getLoaiHinhDN, getThongTinDN } from '@services/doanhNghiepServices'
const loaiDienThoai = [
    { value: 'Di động', label: 'Di động' },
    { value: 'Bàn', label: 'Bàn' },
]
const DoanhNghiepForm = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [loaiHinhs, setLoaiHinhs] = useState<DropdownItem[] | any>()
    const [doanhNghiep, setDoanhNghiep] = useState<DoanhNghiep | null>()
    const [loading, setLoading] = useState(false)
    const [tinhThanhs, setTinhThanhs] = useState<any>()

    const handleChangeDate = (date: string) => {}

    const handleChangeText = (text: string, field: string) => {}

    const fetchData = async () => {
        setLoading(true)
        const loaiHinhs = await getLoaiHinhDN()
        const loaiHinhsDropdown = loaiHinhs?.map((item: any) => ({ value: item.id, label: item.tenLoaiHinh }))
        setLoaiHinhs(loaiHinhsDropdown)

        const tinhThanhs = await layTinhThanh()
        setTinhThanhs(tinhThanhs)

        const doanhNghiep = await getThongTinDN()

        doanhNghiep!.loaihinh =
            loaiHinhsDropdown?.find(x => x.value === doanhNghiep?.loaihinh?.id) || loaiHinhsDropdown[0]

        const diaChiArr = doanhNghiep?.diachi.split(', ') || []
        const diachi = diaChiArr[0]
        const tinh = tinhThanhs.find(x => x.label === diaChiArr[2])
        const thanhPho = tinh?.thanhPhos?.find((x: any) => x.label === diaChiArr[1])
        doanhNghiep!.diachi = diachi
        doanhNghiep!.tinh = tinh
        doanhNghiep!.thanhpho = thanhPho

        setDoanhNghiep(doanhNghiep)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])

    return (
        <View style={{ backgroundColor: Colors.white }}>
            <PageHeader title={'Thông tin doanh nghiệp'} />
            {loading && <Loading />}
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {/* <Text style={formStyles.sectionTitle}>Thông tin doanh nghiệp</Text> */}
                <TextInputBox
                    value={doanhNghiep?.tentiengviet}
                    onChangeText={text => handleChangeText(text, 'tenTiengViet')}
                    label={'Tên doanh nghiệp'}
                />
                <TextInputBox
                    value={doanhNghiep?.tentienganh}
                    onChangeText={text => handleChangeText(text, 'tenTiengAnh')}
                    label={'Tên tiếng anh'}
                />
                <TextInputBox
                    value={doanhNghiep?.tenviettat}
                    onChangeText={text => handleChangeText(text, 'tenVietTat')}
                    label={'Tên viết tắt'}
                />
                <DateSelect value={doanhNghiep?.ngaylap} onSelectedChange={handleChangeDate} label={'Ngày hoạt động'} />

                {doanhNghiep?.loaihinh && (
                    <DropdownComponent
                        data={loaiHinhs}
                        value={doanhNghiep?.loaihinh?.value}
                        label='Loại hình doanh nghiệp'
                        placeholder='Loại hình doanh nghiệp'
                        onSelectedChange={item => handleChangeText(item.value, 'loaiHinhId')}
                    />
                )}
                <TextInputBox
                    value={doanhNghiep?.mathue}
                    onChangeText={text => handleChangeText(text, 'maSoThue')}
                    label={'Mã số thuế'}
                />
                <TextInputBox
                    value={doanhNghiep?.soluongnhansu}
                    onChangeText={text => handleChangeText(text, 'soLuongNhanSu')}
                    label={'Số lượng nhân sự'}
                />
                <TextAreaInputBox
                    value={doanhNghiep?.mota}
                    onChangeText={text => handleChangeText(text, 'moTa')}
                    label={'Mô tả doanh nghiệp123'}
                />
                {doanhNghiep?.tinh && (
                    <DropdownComponent
                        data={tinhThanhs}
                        value={doanhNghiep?.tinh?.value}
                        label='Tỉnh thành'
                        placeholder='Chọn Tỉnh thành'
                        mode='default'
                        onSelectedChange={tinh => {
                            // setDoanhNghiep({ ...doanhNghiep, tinh })
                        }}
                    />
                )}

                {doanhNghiep?.thanhpho && (
                    <DropdownComponent
                        data={doanhNghiep?.tinh?.thanhPhos}
                        value={doanhNghiep?.thanhpho?.value}
                        label='Quận, Huyện'
                        placeholder='Chọn Quận, Huyện'
                        mode='default'
                        onSelectedChange={thanhPho => {
                            // dispatch(setFormDN({ thanhPho }))
                        }}
                    />
                )}
                {/* <View style={formStyles.sectionContainer}> */}
                {/* <Text style={formStyles.sectionTitle}>Thông tin liên hệ</Text> */}

                <TextInputBox
                    value={doanhNghiep?.diachi}
                    onChangeText={text => handleChangeText(text, 'diaChi')}
                    label={'Địa chỉ trụ sở'}
                />
                {doanhNghiep?.dienthoais?.map((dt, index) => (
                    <View key={dt.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <DropdownComponent
                            containerStyles={{ flex: 1 }}
                            data={loaiDienThoai}
                            value={dt.loaisdt}
                            label='Loại'
                            onSelectedChange={item => {
                                // dispatch(setSoDienThoaiDN({ id: dt.id, loaiSdt: item.value }))
                            }}
                        />
                        <TextInputBox
                            containerStyles={{ flex: 1 }}
                            value={dt.sdt}
                            onChangeText={text => {
                                //  dispatch(setSoDienThoaiDN({ id: dt.id, sdt: text }))
                            }}
                            inputProps={{ keyboardType: 'phone-pad' }}
                            label={'Số điện thoại'}
                        />
                        {index > 0 && (
                            <Pressable
                                onPress={() => {
                                    // dispatch(removeSoDienThoaiDN(dt.id)
                                }}>
                                <Ionicons name='remove-circle-outline' size={24} color={Colors.danger} />
                            </Pressable>
                        )}
                    </View>
                ))}

                <Button
                    btnStyles={{
                        marginHorizontal: 24,
                        borderRadius: 20,
                        height: 'auto',
                        padding: 4,
                        marginBottom: 6,
                    }}
                    textStyles={{ fontSize: 14 }}
                    text='Thêm số điện thoại khác'
                    renderIcon={<Ionicons name='add-outline' size={24} color={Colors.white} />}
                    onPress={() => {
                        // dispatch(addSoDienThoaiDN()
                    }}
                />
                <TextInputBox
                    value={doanhNghiep?.fax}
                    onChangeText={text => handleChangeText(text, 'fax')}
                    inputProps={{ keyboardType: 'phone-pad' }}
                    label={'Fax'}
                />
                {/* </View> */}
            </ScrollView>
        </View>
    )
}

export default DoanhNghiepForm

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 12,
        paddingHorizontal: 16,
    },
})
