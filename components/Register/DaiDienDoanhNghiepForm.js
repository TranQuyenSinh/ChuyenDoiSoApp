import React, { useRef, useState, useEffect, useMemo } from 'react'

import { Field, Formik } from 'formik'
import { useRouter } from 'expo-router'
import { Image, StyleSheet } from 'react-native'
import { Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

import { toast } from '@utils/toast'
import Colors from '@constants/Colors'
import Button from '@components/Button'
import useChonAnh from '@hooks/useChonAnh'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@components/StatusPage/Loading'
import { chucVuData } from '@constants/DoanhNghiep/ChucVus'
import dangKySlice, { dangKyDoanhNghiep } from '@redux/dangKySlice'
import { ValidateDropdownComponent } from '@components/Input/Dropdown'
import { daiDienDoanhNghiepValidate } from '@validateSchemas/registerValidate'
import { ValidateInputBox, TextInputBoxWrapper } from '@components/Input/InputBox'

import { formStyles } from './formStyles'

const DaiDienDoanhNghiepForm = ({ onBackPage }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { pickImageAsync } = useChonAnh()
    const [isPosting, setIsPosting] = useState(false)
    const formRef = useRef(null)

    const { loading, tinhThanhs, formDaiDienDN } = useSelector(state => state.dangKy)
    const { setFormDaiDienDN, resetAllForm } = dangKySlice.actions

    const handleChangeText = (field, text) => {
        dispatch(setFormDaiDienDN({ field, value: text }))
    }

    const handleChangeDropdown = (field, item) => {
        dispatch(setFormDaiDienDN({ field, value: item?.value }))
    }

    const pickImage = async (pickType, field) => {
        const result = await pickImageAsync(pickType)
        if (result) {
            formRef.current?.setFieldValue(field, 'picked')
            formRef.current?.setFieldTouched(field, true)
            dispatch(
                setFormDaiDienDN({
                    field,
                    value: { uri: result.uri, name: result.name, type: result.type },
                })
            )
        }
    }

    const handleDangKy = async () => {
        setIsPosting(true)
        try {
            await dispatch(dangKyDoanhNghiep()).unwrap()
            router.replace('auth/login')
            toast('Đăng ký doanh nghiệp thành công')
            dispatch(resetAllForm())
        } catch (error) {
            toast('Có lỗi xảy ra')
        }
        setIsPosting(false)
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
        const tinh = formDaiDienDN.tinh
        return tinh ? tinhThanhs.find(x => x.value === tinh)?.thanhPhos : []
    }, [formDaiDienDN.tinh])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {(loading || isPosting) && <Loading />}
            {!loading && tinhThanhs.length > 0 && (
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        ...formDaiDienDN,
                        tinh: '',
                        thanhPho: '',
                        imgMatTruoc: '',
                        imgMatSau: '',
                        chucVu: '',
                    }}
                    onSubmit={handleDangKy}
                    validationSchema={daiDienDoanhNghiepValidate}>
                    {({ handleSubmit, isValid, values, errors }) => (
                        <>
                            <View style={formStyles.sectionContainer}>
                                <Text style={formStyles.sectionTitle}>Thông tin người đại diện</Text>
                                <View style={{ gap: 20, marginTop: 12 }}>
                                    <Field
                                        component={ValidateInputBox}
                                        name='tenNguoiDaiDien'
                                        onChangeText={(field, text) => handleChangeText(field, text)}
                                        label={'Tên người đại diện'}
                                        inputProps={{
                                            autoCapitalize: 'words',
                                        }}
                                    />
                                    <Field
                                        component={ValidateInputBox}
                                        name='cccd'
                                        onChangeText={(field, text) => handleChangeText(field, text)}
                                        inputProps={{ keyboardType: 'number-pad' }}
                                        label={'CMND/CCCD'}
                                    />
                                    <TextInputBoxWrapper
                                        error={!!errors['imgMatTruoc'] ? true : false}
                                        containerStyles={{ gap: 10, alignItems: 'center', paddingVertical: 20 }}
                                        label={'Ảnh mặt trước CMND/CCCD'}>
                                        {formDaiDienDN.imgMatTruoc?.uri && (
                                            <Image
                                                source={{ uri: formDaiDienDN.imgMatTruoc.uri }}
                                                style={styles.cccdImage}
                                            />
                                        )}
                                        <View style={styles.cccdContainer}>
                                            <Button
                                                renderIcon={
                                                    <Ionicons name='camera-sharp' size={24} color={Colors.white} />
                                                }
                                                btnStyles={{ flex: 1 }}
                                                text={'Máy ảnh'}
                                                onPress={() => pickImage('camera', 'imgMatTruoc')}
                                            />
                                            <Button
                                                renderIcon={
                                                    <Ionicons name='images-sharp' size={24} color={Colors.white} />
                                                }
                                                btnStyles={{ flex: 1 }}
                                                text={'Thư viện'}
                                                onPress={() => pickImage('galery', 'imgMatTruoc')}
                                            />
                                        </View>
                                    </TextInputBoxWrapper>
                                    <TextInputBoxWrapper
                                        error={!!errors['imgMatSau'] ? true : false}
                                        containerStyles={{ gap: 10, alignItems: 'center', paddingVertical: 20 }}
                                        label={'Ảnh mặt sau CMND/CCCD'}>
                                        {formDaiDienDN.imgMatSau?.uri && (
                                            <Image
                                                source={{ uri: formDaiDienDN.imgMatSau.uri }}
                                                style={styles.cccdImage}
                                            />
                                        )}
                                        <View style={styles.cccdContainer}>
                                            <Button
                                                renderIcon={
                                                    <Ionicons name='camera-sharp' size={24} color={Colors.white} />
                                                }
                                                btnStyles={{ flex: 1 }}
                                                text={'Máy ảnh'}
                                                onPress={() => pickImage('camera', 'imgMatSau')}
                                            />
                                            <Button
                                                renderIcon={
                                                    <Ionicons name='images-sharp' size={24} color={Colors.white} />
                                                }
                                                btnStyles={{ flex: 1 }}
                                                text={'Thư viện'}
                                                onPress={() => pickImage('galery', 'imgMatSau')}
                                            />
                                        </View>
                                    </TextInputBoxWrapper>
                                </View>
                            </View>
                            <View style={formStyles.sectionContainer}>
                                <Text style={formStyles.sectionTitle}>Thông tin liên hệ</Text>
                                <View style={{ gap: 20, marginTop: 12 }}>
                                    <Field
                                        component={ValidateInputBox}
                                        name='dienThoai'
                                        onChangeText={(field, text) => handleChangeText(field, text)}
                                        inputProps={{ keyboardType: 'number-pad' }}
                                        label={'Số điện thoại'}
                                    />
                                    <Field
                                        component={ValidateInputBox}
                                        name='email'
                                        onChangeText={(field, text) => handleChangeText(field, text)}
                                        inputProps={{
                                            autoCapitalize: 'none',
                                            keyboardType: 'email-address',
                                        }}
                                        label={'Email cá nhân'}
                                    />
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
                                        label={'Địa chỉ'}
                                    />
                                    <Field
                                        data={chucVuData}
                                        component={ValidateDropdownComponent}
                                        name='chucVu'
                                        label='Chức vụ'
                                        placeholder='Chọn chức vụ'
                                        onSelectedChange={handleChangeDropdown}
                                    />
                                </View>
                            </View>
                            <View style={formStyles.navigateContainer}>
                                <Pressable onPress={onBackPage} style={formStyles.navigateBtn}>
                                    <Ionicons name='arrow-back-sharp' size={24} color={Colors.white} />
                                    <Text style={formStyles.navigateText}>Quay lại</Text>
                                </Pressable>
                                <Pressable
                                    onPress={isValid ? handleSubmit : undefined}
                                    style={[
                                        formStyles.navigateBtn,
                                        { backgroundColor: isValid ? Colors.success : Colors.textGray },
                                    ]}>
                                    <Text style={formStyles.navigateText}>Hoàn tất đăng ký</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </Formik>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cccdContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 16,
        marginTop: 6,
    },
    cccdImage: {
        width: '100%',
        height: 200,
    },
})

export default DaiDienDoanhNghiepForm
