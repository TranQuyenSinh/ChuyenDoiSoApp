import React, { useState } from 'react'

import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import DropdownComponent from '@components/Input/Dropdown'
import TextInputBox, { TextAreaInputBox } from '@components/Input/InputBox'
import { formStyles } from './formStyles'
import dangKySlice from '@redux/dangKySlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@components/Button'
import Loading from '@components/StatusPage/Loading'
import { DateSelect } from '@components/Input/DatePicker'
import moment from '@utils/moment'
const data = [
    { label: 'An Giang', value: '1' },
    { label: 'Cần Thơ', value: '2' },
    { label: 'Kiên Giang', value: '3' },
]

const ThongTinDoanhNghiepForm = () => {
    const dispatch = useDispatch()
    const { pageIndex, loading, tinhThanhs, formDN } = useSelector(state => state.dangKy)
    const { setPageIndex, setFormDN } = dangKySlice.actions

    const handleChangeDate = date => {
        const formatedDate = moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
        dispatch(setFormDN({ ngayHoatDong: formatedDate }))
    }

    const handleChangeText = (text, field) => {
        dispatch(setFormDN({ [field]: text }))
    }
    return (
        <>
            {loading && <Loading />}
            {!loading && tinhThanhs.length > 0 && (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
                    <Text style={formStyles.title}>Đăng ký thông tin doanh nghiệp</Text>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin cơ bản</Text>
                        <TextInputBox
                            value={formDN.ten}
                            onChangeText={text => handleChangeText(text, 'ten')}
                            label={'Tên doanh nghiệp'}
                        />
                        <TextInputBox
                            value={formDN.tenTiengAnh}
                            onChangeText={text => handleChangeText(text, 'tenTiengAnh')}
                            label={'Tên tiếng anh'}
                        />
                        <TextInputBox
                            value={formDN.tenVietTat}
                            onChangeText={text => handleChangeText(text, 'tenVietTat')}
                            label={'Tên viết tắt'}
                        />
                        <DateSelect
                            value={formDN.ngayHoatDong}
                            onSelectedChange={handleChangeDate}
                            label={'Ngày hoạt động'}
                        />
                    </View>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin doanh nghiệp</Text>
                        <DropdownComponent
                            data={data}
                            label='Lĩnh vực'
                            placeholder='Lĩnh vực kinh doanh'
                            onSelectedChange={item => console.log('===> name', item.label)}
                        />
                        <DropdownComponent
                            data={data}
                            label='Loại hình'
                            placeholder='Loại hình kinh doanh'
                            onSelectedChange={item => console.log('===> name', item.label)}
                        />
                        <TextInputBox
                            value={formDN.maSoThue}
                            onChangeText={text => handleChangeText(text, 'maSoThue')}
                            label={'Mã số thuế'}
                        />
                        <TextInputBox
                            value={formDN.vonDieuLe}
                            onChangeText={text => handleChangeText(text, 'vonDieuLe')}
                            label={'Vốn điều lệ'}
                        />
                        <TextInputBox
                            value={formDN.quyMoNhanSu}
                            onChangeText={text => handleChangeText(text, 'quyMoNhanSu')}
                            label={'Quy mô nhân sự'}
                        />
                        <TextAreaInputBox
                            value={formDN.moTa}
                            onChangeText={text => handleChangeText(text, 'moTa')}
                            label={'Mô tả doanh nghiệp'}
                        />
                    </View>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin liên hệ</Text>
                        <DropdownComponent
                            data={tinhThanhs}
                            label='Tỉnh thành'
                            placeholder='Chọn Tỉnh thành'
                            onSelectedChange={tinh => dispatch(setFormDN({ tinh }))}
                        />
                        <DropdownComponent
                            data={formDN.tinh ? formDN.tinh.thanhPhos : []}
                            label='Quận, Huyện'
                            placeholder='Chọn Quận, Huyện'
                            onSelectedChange={thanhPho => dispatch(setFormDN({ thanhPho }))}
                        />
                        <TextInputBox
                            value={formDN.diaChi}
                            onChangeText={text => handleChangeText(text, 'diaChi')}
                            label={'Địa chỉ trụ sở'}
                        />
                        <TextInputBox
                            value={formDN.email}
                            onChangeText={text => handleChangeText(text, 'email')}
                            inputProps={{ keyboardType: 'email-address' }}
                            label={'Email doanh nghiệp'}
                        />
                        <TextInputBox
                            value={formDN.dienThoai}
                            onChangeText={text => handleChangeText(text, 'dienThoai')}
                            inputProps={{ keyboardType: 'phone-pad' }}
                            label={'Số điện thoại'}
                        />
                        <TextInputBox
                            value={formDN.fax}
                            onChangeText={text => handleChangeText(text, 'fax')}
                            inputProps={{ keyboardType: 'phone-pad' }}
                            label={'Fax'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
                        <Button
                            onPress={() => dispatch(setPageIndex({ pageIndex: pageIndex + 1 }))}
                            text={'Tiếp tục'}
                        />
                    </View>
                </ScrollView>
            )}
        </>
    )
}

export default ThongTinDoanhNghiepForm
