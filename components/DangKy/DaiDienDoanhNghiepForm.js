import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'

import Button from '@components/Button'
import DropdownComponent from '@components/Input/Dropdown'
import TextInputBox from '@components/Input/InputBox'
import { formStyles } from './formStyles'
import { useDispatch, useSelector } from 'react-redux'
import dangKySlice, { dangKyDoanhNghiep } from '@redux/dangKySlice'
import moment from '@utils/moment'
import Loading from '@components/StatusPage/Loading'
const data = [
    { label: 'An Giang', value: '1' },
    { label: 'Cần Thơ', value: '2' },
    { label: 'Kiên Giang', value: '3' },
]

const DaiDienDoanhNghiepForm = () => {
    const dispatch = useDispatch()
    const { pageIndex, loading, tinhThanhs, formDaiDienDN } = useSelector(state => state.dangKy)
    const { setPageIndex, setFormDaiDienDN } = dangKySlice.actions

    const handleChangeText = (text, field) => {
        dispatch(setFormDaiDienDN({ [field]: text }))
    }
    return (
        <ScrollView>
            {loading && <Loading />}
            {!loading && tinhThanhs.length > 0 && (
                <>
                    <Text style={formStyles.title}>Thông tin người đại diện</Text>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin cá nhân</Text>
                        <TextInputBox
                            value={formDaiDienDN.ten}
                            onChangeText={text => handleChangeText(text, 'ten')}
                            label={'Tên người đại diện'}
                        />
                        <TextInputBox
                            value={formDaiDienDN.cccd}
                            onChangeText={text => handleChangeText(text, 'cccd')}
                            inputProps={{ keyboardType: 'number-pad' }}
                            label={'CMND/CCCD'}
                        />
                        <TextInputBox
                            value={formDaiDienDN.noiCap}
                            onChangeText={text => handleChangeText(text, 'noiCap')}
                            label={'Nơi cấp'}
                        />
                    </View>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin liên hệ</Text>
                        <TextInputBox
                            value={formDaiDienDN.dienThoai}
                            onChangeText={text => handleChangeText(text, 'dienThoai')}
                            inputProps={{ keyboardType: 'number-pad' }}
                            label={'Số điện thoại'}
                        />
                        <TextInputBox
                            value={formDaiDienDN.email}
                            onChangeText={text => handleChangeText(text, 'email')}
                            inputProps={{ keyboardType: 'email-address' }}
                            label={'Email cá nhân'}
                        />
                        <DropdownComponent
                            data={tinhThanhs}
                            label='Tỉnh thành'
                            placeholder='Chọn Tỉnh thành'
                            onSelectedChange={tinh => dispatch(setFormDaiDienDN({ tinh }))}
                        />
                        <DropdownComponent
                            data={formDaiDienDN.tinh ? formDaiDienDN.tinh.thanhPhos : []}
                            label='Quận, Huyện'
                            placeholder='Chọn Quận, Huyện'
                            onSelectedChange={thanhPho => dispatch(setFormDaiDienDN({ thanhPho }))}
                        />
                        <TextInputBox
                            value={formDaiDienDN.diaChi}
                            onChangeText={text => handleChangeText(text, 'diaChi')}
                            label={'Địa chỉ'}
                        />
                        <DropdownComponent
                            data={data}
                            label='Chức vụ'
                            placeholder='Chọn chức vụ'
                            onSelectedChange={item => console.log('===> name', item.label)}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <Button text={'Hoàn tất đăng ký'} onPress={() => dispatch(dangKyDoanhNghiep())} />
                    </View>
                </>
            )}
        </ScrollView>
    )
}

export default DaiDienDoanhNghiepForm
