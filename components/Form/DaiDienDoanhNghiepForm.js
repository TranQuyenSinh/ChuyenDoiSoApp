import React, { useEffect, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { Alert, Pressable, Text, View } from 'react-native'

import Button from '@components/Button'
import DropdownComponent from '@components/Input/Dropdown'
import TextInputBox, { TextInputBoxWrapper } from '@components/Input/InputBox'
import { formStyles } from './formStyles'
import { useDispatch, useSelector } from 'react-redux'
import dangKySlice, { dangKyDoanhNghiep } from '@redux/dangKySlice'
import moment from '@utils/moment'
import Loading from '@components/StatusPage/Loading'
import { getLinhVuc } from '@services/doanhNghiepServices'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import { axios } from '@utils/axios'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { useRouter } from 'expo-router'
import { toast } from '@utils/toast'

const chucVuData = [
    { label: 'Giám đốc', value: 'Giám đốc' },
    { label: 'Nhân viên', value: 'Nhân viên' },
]

const DaiDienDoanhNghiepForm = ({ onBackPage }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [status, requestPermission] = ImagePicker.useCameraPermissions()
    const { pageIndex, loading, tinhThanhs, formDaiDienDN } = useSelector(state => state.dangKy)
    const { setPageIndex, setFormDaiDienDN, resetAllForm } = dangKySlice.actions
    const [isPosting, setIsPosting] = useState(false)

    const handleChangeText = (text, field) => {
        dispatch(setFormDaiDienDN({ [field]: text }))
    }

    const verifyPermission = async () => {
        if (status.status == ImagePicker.PermissionStatus.DENIED) {
            const permissionResponse = await ImagePicker.requestCameraPermissionsAsync()
            return permissionResponse.granted
        }
        return true
    }

    const pickImage = async (pickType, field) => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return
        }
        const pickImageOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            cameraType: ImagePicker.CameraType.back,
            quality: 1,
        }
        let { assets } =
            pickType === 'camera'
                ? await ImagePicker.launchCameraAsync(pickImageOptions)
                : await ImagePicker.launchImageLibraryAsync(pickImageOptions)
        if (assets) {
            const uri = assets[0].uri
            let name = uri.split('/').pop()
            let match = /\.(\w+)$/.exec(name)
            let type = match ? `image/${match[1]}` : `image`

            dispatch(
                setFormDaiDienDN({
                    [field]: { uri, name, type },
                })
            )
        }
    }

    const handleDangKy = async () => {
        setIsPosting(true)
        const result = await dispatch(dangKyDoanhNghiep()).unwrap()
        if (result) {
            router.replace('auth/login')
            toast('Đăng ký doanh nghiệp thành công')
            dispatch(resetAllForm())
        } else {
            toast('Đăng ký thất bại, vui lòng thử lại')
        }
        setIsPosting(false)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {(loading || isPosting) && <Loading />}
            {!loading && tinhThanhs.length > 0 && (
                <>
                    <View style={formStyles.sectionContainer}>
                        <Text style={formStyles.sectionTitle}>Thông tin người đại diện</Text>
                        <TextInputBox
                            value={formDaiDienDN.tenNguoiDaiDien}
                            onChangeText={text => handleChangeText(text, 'tenNguoiDaiDien')}
                            label={'Tên người đại diện'}
                        />
                        <TextInputBox
                            value={formDaiDienDN.cccd}
                            onChangeText={text => handleChangeText(text, 'cccd')}
                            inputProps={{ keyboardType: 'number-pad' }}
                            label={'CMND/CCCD'}
                        />
                        <TextInputBoxWrapper
                            containerStyles={{ gap: 10, alignItems: 'center', paddingVertical: 20 }}
                            label={'Ảnh mặt trước CMND/CCCD'}>
                            {formDaiDienDN.imgMatTruoc?.uri && (
                                <Image
                                    source={{ uri: formDaiDienDN.imgMatTruoc.uri }}
                                    style={{ width: '100%', height: 200 }}
                                />
                            )}
                            <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 6 }}>
                                <Button
                                    renderIcon={<Ionicons name='camera-sharp' size={24} color={Colors.white} />}
                                    btnStyles={{ flex: 1 }}
                                    text={'Máy ảnh'}
                                    onPress={() => pickImage('camera', 'imgMatTruoc')}
                                />
                                <Button
                                    renderIcon={<Ionicons name='images-sharp' size={24} color={Colors.white} />}
                                    btnStyles={{ flex: 1 }}
                                    text={'Thư viện'}
                                    onPress={() => pickImage('galery', 'imgMatTruoc')}
                                />
                            </View>
                        </TextInputBoxWrapper>
                        <TextInputBoxWrapper
                            containerStyles={{ gap: 10, alignItems: 'center', paddingVertical: 20 }}
                            label={'Ảnh mặt sau CMND/CCCD'}>
                            {formDaiDienDN.imgMatSau?.uri && (
                                <Image
                                    source={{ uri: formDaiDienDN.imgMatSau.uri }}
                                    style={{ width: '100%', height: 200 }}
                                />
                            )}
                            <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 6 }}>
                                <Button
                                    renderIcon={<Ionicons name='camera-sharp' size={24} color={Colors.white} />}
                                    btnStyles={{ flex: 1 }}
                                    text={'Máy ảnh'}
                                    onPress={() => pickImage('camera', 'imgMatSau')}
                                />
                                <Button
                                    renderIcon={<Ionicons name='images-sharp' size={24} color={Colors.white} />}
                                    btnStyles={{ flex: 1 }}
                                    text={'Thư viện'}
                                    onPress={() => pickImage('galery', 'imgMatSau')}
                                />
                            </View>
                        </TextInputBoxWrapper>
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
                            inputProps={{
                                autoCapitalize: 'none',
                                keyboardType: 'email-address',
                            }}
                            value={formDaiDienDN.email}
                            onChangeText={text => handleChangeText(text, 'email')}
                            label={'Email cá nhân'}
                        />
                        <DropdownComponent
                            data={tinhThanhs}
                            value={formDaiDienDN.tinh?.value}
                            label='Tỉnh thành'
                            placeholder='Chọn Tỉnh thành'
                            mode='default'
                            onSelectedChange={tinh => dispatch(setFormDaiDienDN({ tinh }))}
                        />
                        <DropdownComponent
                            data={formDaiDienDN.tinh ? formDaiDienDN.tinh.thanhPhos : []}
                            value={formDaiDienDN.thanhPho?.value}
                            label='Quận, Huyện'
                            placeholder='Chọn Quận, Huyện'
                            mode='default'
                            onSelectedChange={thanhPho => dispatch(setFormDaiDienDN({ thanhPho }))}
                        />
                        <TextInputBox
                            value={formDaiDienDN.diaChi}
                            onChangeText={text => handleChangeText(text, 'diaChi')}
                            label={'Địa chỉ'}
                        />
                        <DropdownComponent
                            data={chucVuData}
                            value={formDaiDienDN.chucVu}
                            label='Chức vụ'
                            placeholder='Chọn chức vụ'
                            onSelectedChange={item => handleChangeText(item.label, 'chucVu')}
                        />
                    </View>
                    <View style={formStyles.navigateContainer}>
                        <Pressable onPress={onBackPage} style={formStyles.navigateBtn}>
                            <Ionicons name='arrow-back-sharp' size={24} color={Colors.white} />
                            <Text style={formStyles.navigateText}>Quay lại</Text>
                        </Pressable>
                        <Pressable
                            onPress={handleDangKy}
                            style={[formStyles.navigateBtn, { backgroundColor: Colors.success }]}>
                            <Text style={formStyles.navigateText}>Hoàn tất đăng ký</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </ScrollView>
    )
}

export default DaiDienDoanhNghiepForm
