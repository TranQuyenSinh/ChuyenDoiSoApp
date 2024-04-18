import React, { useEffect, useLayoutEffect, useState } from 'react'

import { router, useNavigation } from 'expo-router'
import { StyleSheet, ScrollView, Text, KeyboardAvoidingView, TextInput, Image } from 'react-native'
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
import { chucVuData } from '@constants/DoanhNghiep/ChucVus'

const DoanhNghiepInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)
    const [loading, setLoading] = useState(false)

    const [images, setImages] = useState<any>()

    const [form, setForm] = useState({
        tenDaiDien: '',
        email: '',
        sdt: '',
        diaChi: '',
        cccd: '',
        imgMatTruoc: '',
        imgMatSau: '',
        chucVu: '',
        moTa: '',
    })

    useEffect(() => {
        if (!doanhNghiep) return
        const { daiDien } = doanhNghiep
        // email: '',
        // sdt: '',
        // diaChi: '',
        // cccd: '',
        // imgMatTruoc: '',
        // imgMatSau: '',
        // chucVu: '',
        // moTa: '',
        setForm({
            tenDaiDien: daiDien?.tenDaiDien,
            email: daiDien?.email,
            sdt: daiDien?.sdt,
            diaChi: daiDien?.diaChi,
            cccd: daiDien?.cccd,
            chucVu: daiDien?.chucVu,
            moTa: daiDien?.moTa,
            imgMatSau: daiDien?.imgMatSau,
            imgMatTruoc: daiDien?.imgMatTruoc,
        })
    }, [doanhNghiep])

    const handleSubmit = async () => {
        setLoading(true)
        const isSuccess = await updateDoanhNghiep(form)
        if (isSuccess) {
            toast("Cập nhật thành công")
            dispatch(fetchDoanhNghiepInfo())
            router.back()
        }
        setLoading(false)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Cập nhật đại diện doanh nghiệp',
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
                {(status === 'loading') && <Loading />}
                {status === 'error' && <TryAgain onPress={() => dispatch(fetchDoanhNghiepInfo())} />}
                {status === 'success' && (
                    <>
                        <Text style={inputStyles.label}>Họ tên</Text>
                        <TextInput
                            value={form.tenDaiDien}
                            onChangeText={text => setForm({ ...form, tenDaiDien: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                        />
                        <Text style={inputStyles.label}>Email</Text>
                        <TextInput
                            value={form.email}
                            onChangeText={text => setForm({ ...form, email: text })}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Điện thoại</Text>
                        <TextInput
                            value={form.sdt}
                            onChangeText={text => setForm({ ...form, sdt: text })}
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Địa chỉ</Text>
                        <TextInput
                            value={form.diaChi}
                            onChangeText={text => setForm({ ...form, diaChi: text })}
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

                        <Text style={inputStyles.label}>Chức vụ</Text>
                        <Dropdown
                            style={inputStyles.input}
                            data={chucVuData}
                            placeholder='Chọn chức vụ'
                            search={false}
                            maxHeight={300}
                            labelField={'label'}
                            valueField={'value'}
                            value={chucVuData.find(item => item?.value === form?.chucVu)?.value}
                            onChange={(item: any) => {
                                setForm({ ...form, chucVu: item?.value })
                            }}
                            mode={'modal'}
                        />

                        <Text style={inputStyles.label}>CCCD</Text>
                        <TextInput
                            value={form.cccd}
                            onChangeText={text => setForm({ ...form, cccd: text })}
                            keyboardType='number-pad'
                            style={inputStyles.input}
                        />

                        <Text style={inputStyles.label}>Ảnh mặt trước</Text>
                        {form.imgMatTruoc && (
                            <Image
                                source={{ uri: form.imgMatTruoc }}
                                style={inputStyles.image}
                            />
                        )}


                        <Button btnStyles={inputStyles.button} text='Cập nhật' onPress={handleSubmit} />
                    </>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

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
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8
    }
})

export default DoanhNghiepInfo
