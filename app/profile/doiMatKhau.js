import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useRouter, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { TabView, SceneMap } from 'react-native-tab-view'
import {
    Text,
    Image,
    Alert,
    Pressable,
    Dimensions,
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles, textStyles } from '@constants/Styles'
import background from '@assets/images/phieu1_bg.jpg'
import dangKySlice, { fetchTinhThanh } from '@redux/dangKySlice'
import DaiDienDoanhNghiepForm from '@components/DangKy/DaiDienDoanhNghiepForm'
import ThongTinDoanhNghiepForm from '@components/DangKy/ThongTinDoanhNghiepForm'
import TextInputBox from '@components/Input/InputBox'
import PageHeader from '@components/View/PageHeader'
import Button from '@components/Button'
import { checkUserHasPassword, doiMatKhau } from '@services/accountServices'
import Loading from '@components/StatusPage/Loading'
import NotFound from '@components/StatusPage/NotFound'
import { toast } from '@utils/toast'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { getSecureItem, setSecureItem } from '@utils/secureStore'
const { width, height } = Dimensions.get('screen')

const tabViewScene = [
    { key: 'formDN', title: 'Đăng ký thông tin doanh nghiệp' },
    { key: 'formDaiDienDN', title: 'Đăng ký thông tin đại diện doanh nghiệp' },
]
const DangKyDoanhNghiep = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const navigation = useNavigation()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [isHasPassword, setIsHasPassword] = useState(true)
    const [status, setStatus] = useState('idle')

    useEffect(() => {
        ;(async () => {
            setStatus('loading')
            try {
                let isHasPassword = await checkUserHasPassword()
                setIsHasPassword(isHasPassword)
                setStatus('idle')
            } catch (err) {
                setStatus('error')
            }
        })()
    }, [])

    const validate = () => {
        if (!newPassword || !rePassword || (isHasPassword && !currentPassword)) {
            toast('Nhập đầy đủ các trường')
            return false
        }
        if (newPassword !== rePassword) {
            toast('Mật khẩu xác nhận không khớp')
            return false
        }
        if (newPassword.length < 8) {
            toast('Mật khẩu phải dài hơn 8 kí tự')
            return false
        }
        return true
    }

    const handleDoiMatKhau = async () => {
        if (!validate()) return
        setStatus('loading')
        const { result, message } = await doiMatKhau(currentPassword, newPassword)
        if (result) {
            toast('Đổi mật khẩu thành công')

            // Cập nhật secure store
            const save_auth = await getSecureItem('save_auth')
            await setSecureItem('save_auth', {
                type: 'password',
                email: save_auth?.email,
                password: newPassword,
            })
            setStatus('idle')
            router.back()
        } else {
            toast(message)
            setStatus('idle')
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[defaultStyles.container, { paddingTop: 40 }]}>
                <PageHeader title={'Đổi mật khẩu'} />
                {status === 'loading' && <Loading />}
                {status === 'error' && <NotFound isShownBtn={false} message='Có lỗi xảy ra, vui lòng thử lại' />}
                {status === 'idle' && (
                    <View style={{ marginTop: 20, gap: 10 }}>
                        {isHasPassword && (
                            <TextInputBox
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                inputProps={{ secureTextEntry: true }}
                                label={'Mật khẩu hiện tại'}
                                placeholder='Nhập mật khẩu hiện tại'
                            />
                        )}
                        <TextInputBox
                            value={newPassword}
                            onChangeText={setNewPassword}
                            inputProps={{ secureTextEntry: true }}
                            label={'Mật khẩu mới'}
                            placeholder='Nhập mật khẩu mới'
                        />
                        <TextInputBox
                            value={rePassword}
                            onChangeText={setRePassword}
                            inputProps={{ secureTextEntry: true }}
                            label={'Xác nhận mật khẩu mới'}
                            placeholder='Nhập lại mật khẩu mới'
                        />
                        <Button text={'Đổi mật khẩu'} onPress={handleDoiMatKhau} />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default DangKyDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        height,
        width,
        resizeMode: 'cover',
    },
})
