import React, { useState, useEffect } from 'react'

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
import DropdownComponent from '@components/Input/Dropdown'
import { getLoaiHinhDN } from '@services/doanhNghiepServices'
import TextInputBox, { TextAreaInputBox } from '@components/Input/InputBox'

import { formStyles } from './formStyles'
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
        dispatch(setFormDN({ ngayLap: formatedDate }))
    }

    const handleChangeText = (text, field) => {
        dispatch(setFormDN({ [field]: text }))
    }

    const fetchData = async () => {
        setLocalLoading(true)
        const loaiHinhs = await getLoaiHinhDN()
        setLoaiHinhs(loaiHinhs.map(item => ({ value: item.id, label: item.tenLoaiHinh })))
        setLocalLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            {(loading || localLoading || tinhThanhs.length === 0) && <Loading />}
            {!loading && !localLoading && tinhThanhs.length > 0 && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin doanh nghiệp</Text>
                        <TextInputBox
                            value={formDN.tenTiengViet}
                            onChangeText={text => handleChangeText(text, 'tenTiengViet')}
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
                            value={formDN.ngayLap}
                            onSelectedChange={handleChangeDate}
                            label={'Ngày hoạt động'}
                        />
                        <DropdownComponent
                            data={loaiHinhs}
                            value={loaiHinhs.find(x => x.value === formDN.loaiHinhId)?.label}
                            label='Loại hình doanh nghiệp'
                            placeholder='Loại hình doanh nghiệp'
                            onSelectedChange={item => handleChangeText(item.value, 'loaiHinhId')}
                        />
                        <TextInputBox
                            value={formDN.maSoThue}
                            onChangeText={text => handleChangeText(text, 'maSoThue')}
                            label={'Mã số thuế'}
                        />
                        <TextInputBox
                            value={formDN.soLuongNhanSu}
                            onChangeText={text => handleChangeText(text, 'soLuongNhanSu')}
                            label={'Số lượng nhân sự'}
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
                            value={formDN.tinh?.value}
                            label='Tỉnh thành'
                            placeholder='Chọn Tỉnh thành'
                            mode='default'
                            onSelectedChange={tinh => dispatch(setFormDN({ tinh }))}
                        />
                        <DropdownComponent
                            data={formDN.tinh ? formDN.tinh.thanhPhos : []}
                            value={formDN.thanhPho?.value}
                            label='Quận, Huyện'
                            placeholder='Chọn Quận, Huyện'
                            mode='default'
                            onSelectedChange={thanhPho => dispatch(setFormDN({ thanhPho }))}
                        />
                        <TextInputBox
                            value={formDN.diaChi}
                            onChangeText={text => handleChangeText(text, 'diaChi')}
                            label={'Địa chỉ trụ sở'}
                        />
                        {formDN.dienThoais?.map((dt, index) => (
                            <View key={dt.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
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
                                    onChangeText={text => dispatch(setSoDienThoaiDN({ id: dt.id, sdt: text }))}
                                    inputProps={{ keyboardType: 'phone-pad' }}
                                    label={'Số điện thoại'}
                                />
                                {index > 0 && (
                                    <Pressable onPress={() => dispatch(removeSoDienThoaiDN(dt.id))}>
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
                            onPress={() => dispatch(addSoDienThoaiDN())}
                        />
                        <TextInputBox
                            value={formDN.fax}
                            onChangeText={text => handleChangeText(text, 'fax')}
                            inputProps={{ keyboardType: 'phone-pad' }}
                            label={'Fax'}
                        />
                    </View>
                    <View style={formStyles.navigateContainer}>
                        <Pressable onPress={onBackPage} style={formStyles.navigateBtn}>
                            <Ionicons name='arrow-back-sharp' size={24} color={Colors.white} />
                            <Text style={formStyles.navigateText}>Quay lại</Text>
                        </Pressable>
                        <Pressable onPress={onNextPage} style={formStyles.navigateBtn}>
                            <Text style={formStyles.navigateText}>Tiếp tục</Text>
                            <Ionicons name='arrow-forward-sharp' size={24} color={Colors.white} />
                        </Pressable>
                    </View>
                </ScrollView>
            )}
        </>
    )
}

export default ThongTinDoanhNghiepForm
