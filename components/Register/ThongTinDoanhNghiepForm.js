import React, { useState, useEffect, useMemo } from 'react'

import { Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import Button from '@components/Button'
import dangKySlice from '@redux/dangKySlice'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@components/StatusPage/Loading'
import { DateSelect } from '@components/Input/DatePicker'
import DropdownComponent, { ValidateDropdownComponent } from '@components/Input/Dropdown'
import { getLoaiHinhDN } from '@services/doanhNghiepServices'
import TextInputBox, { TextAreaInputBox, ValidateInputBox } from '@components/Input/InputBox'

import { formStyles } from './formStyles'
import { Field, Formik } from 'formik'
import { dangKyDoanhNghiepValidate } from '@validateSchemas/registerValidate'
const loaiDienThoai = [
    { value: 'Di động', label: 'Di động' },
    { value: 'Bàn', label: 'Bàn' },
]

const ThongTinDoanhNghiepForm = ({ onNextPage, onBackPage }) => {
    const dispatch = useDispatch()
    const { loading, tinhThanhs, formDN } = useSelector(state => state.dangKy)
    const { setFormDN, addSoDienThoaiDN, removeSoDienThoaiDN, setSoDienThoaiDN } = dangKySlice.actions
    const [loaiHinhs, setLoaiHinhs] = useState([])
    const [localLoading, setLocalLoading] = useState(false)

    const handleChangeDate = date => {
        const formatedDate = moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
        dispatch(setFormDN({ field: 'ngayLap', value: formatedDate }))
    }

    const handleChangeText = (field, text) => {
        dispatch(setFormDN({ field, value: text }))
    }

    const handleChangeDropdown = (field, item) => {
        dispatch(setFormDN({ field, value: item?.value }))
    }

    const fetchData = async () => {
        setLocalLoading(true)
        const loaiHinhs = await getLoaiHinhDN()
        setLoaiHinhs(loaiHinhs.map(item => ({ value: item.id, label: item.tenLoaiHinh })))
        setLocalLoading(false)
    }

    const tinhData = useMemo(
        () =>
            tinhThanhs.map(item => ({
                label: item.label,
                value: item.value,
            })),
        [tinhThanhs]
    )

    const thanhPhoData = useMemo(() => {
        const tinh = formDN.tinh
        return tinh ? tinhThanhs.find(x => x.value === tinh)?.thanhPhos : []
    }, [formDN.tinh])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {(loading || localLoading || tinhThanhs.length === 0) && <Loading />}
            {!loading && !localLoading && tinhThanhs.length > 0 && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        validationSchema={dangKyDoanhNghiepValidate}
                        initialValues={{
                            ...formDN,
                            loaiHinhId: '',
                            tinh: '',
                            thanhPho: '',
                        }}
                        onSubmit={onNextPage}>
                        {({ handleSubmit, isValid, values }) => (
                            <>
                                <View style={formStyles.sectionContainer}>
                                    <Text style={formStyles.sectionTitle}>Thông tin doanh nghiệp</Text>
                                    <View style={{ gap: 20 }}>
                                        <Field
                                            component={ValidateInputBox}
                                            name='tenTiengViet'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Tên doanh nghiệp'}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='tenTiengAnh'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Tên tiếng anh'}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='tenVietTat'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Tên viết tắt'}
                                        />
                                        <DateSelect
                                            value={formDN.ngayLap}
                                            onSelectedChange={handleChangeDate}
                                            label={'Ngày hoạt động'}
                                        />
                                        <Field
                                            data={loaiHinhs}
                                            component={ValidateDropdownComponent}
                                            name='loaiHinhId'
                                            label='Loại hình doanh nghiệp'
                                            placeholder='Loại hình doanh nghiệp'
                                            onSelectedChange={handleChangeDropdown}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='maSoThue'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Mã số thuế'}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='soLuongNhanSu'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Số lượng nhân sự'}
                                            inputProps={{ keyboardType: 'number-pad' }}
                                        />
                                        <TextAreaInputBox
                                            value={formDN.moTa}
                                            onChangeText={text => handleChangeText('moTa', text)}
                                            label={'Mô tả doanh nghiệp'}
                                        />
                                    </View>
                                </View>
                                <View style={formStyles.sectionContainer}>
                                    <Text style={formStyles.sectionTitle}>Thông tin liên hệ</Text>
                                    <View style={{ gap: 10 }}>
                                        {tinhThanhs?.length > 0 && (
                                            <Field
                                                data={tinhData}
                                                component={ValidateDropdownComponent}
                                                name='tinh'
                                                label='Tỉnh thành'
                                                placeholder='Chọn Tỉnh thành'
                                                mode='default'
                                                onSelectedChange={handleChangeDropdown}
                                            />
                                        )}
                                        <Field
                                            data={thanhPhoData}
                                            component={ValidateDropdownComponent}
                                            name='thanhPho'
                                            label='Quận, Huyện'
                                            placeholder='Chọn Quận, Huyện'
                                            mode='default'
                                            onSelectedChange={handleChangeDropdown}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='diaChi'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            label={'Địa chỉ trụ sở'}
                                        />
                                        {formDN.dienThoais?.map((dt, index) => (
                                            <View
                                                key={dt.id}
                                                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <DropdownComponent
                                                    containerStyles={{ flex: 1 }}
                                                    data={loaiDienThoai}
                                                    value={dt.loaiSdt}
                                                    label='Loại'
                                                    onSelectedChange={item => {
                                                        dispatch(setSoDienThoaiDN({ id: dt.id, loaiSdt: item.value }))
                                                    }}
                                                />
                                                <TextInputBox
                                                    containerStyles={{ flex: 1 }}
                                                    value={dt.sdt}
                                                    onChangeText={text =>
                                                        dispatch(setSoDienThoaiDN({ id: dt.id, sdt: text }))
                                                    }
                                                    inputProps={{ keyboardType: 'phone-pad' }}
                                                    label={'Số điện thoại'}
                                                />
                                                {index > 0 && (
                                                    <Pressable onPress={() => dispatch(removeSoDienThoaiDN(dt.id))}>
                                                        <Ionicons
                                                            name='remove-circle-outline'
                                                            size={24}
                                                            color={Colors.danger}
                                                        />
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
                                            onPress={() => dispatch(addSoDienThoaiDN())}
                                        />
                                        <Field
                                            component={ValidateInputBox}
                                            name='fax'
                                            onChangeText={(field, text) => handleChangeText(field, text)}
                                            inputProps={{ keyboardType: 'number-pad' }}
                                            label={'Fax'}
                                        />
                                    </View>
                                </View>
                                <View style={formStyles.navigateContainer}>
                                    <Pressable onPress={onBackPage} style={formStyles.navigateBtn}>
                                        <Ionicons name='arrow-back-sharp' size={24} color={Colors.white} />
                                        <Text style={formStyles.navigateText}>Quay lại</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={handleSubmit}
                                        style={[
                                            formStyles.navigateBtn,
                                            !isValid && { backgroundColor: Colors.textGray },
                                        ]}>
                                        <Text style={formStyles.navigateText}>Tiếp tục</Text>
                                        <Ionicons name='arrow-forward-sharp' size={24} color={Colors.white} />
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            )}
        </>
    )
}

export default ThongTinDoanhNghiepForm