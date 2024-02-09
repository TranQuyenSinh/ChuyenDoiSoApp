import React, { useState, useLayoutEffect } from 'react'

import { useRouter, useNavigation } from 'expo-router'
import { View, Keyboard, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { toast } from '@utils/toast'
import Button from '@components/Button'
import Constants from '@constants/Constants'
import { defaultStyles } from '@constants/Styles'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import TextInputBox from '@components/Input/InputBox'
import { doiMatKhau } from '@services/accountServices'
import NotFound from '@components/StatusPage/NotFound'
import { getSecureItem, setSecureItem } from '@utils/secureStore'
import Colors from '@constants/Colors'
const { width, height } = Dimensions.get('screen')

const tabViewScene = [
    { key: 'formDN', title: 'Đăng ký thông tin doanh nghiệp' },
    { key: 'formDaiDienDN', title: 'Đăng ký thông tin đại diện doanh nghiệp' },
]
const DangKyDoanhNghiep = () => {
    const router = useRouter()
    const navigation = useNavigation()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [status, setStatus] = useState('idle')

    const validate = () => {
        if (!newPassword || !rePassword || !currentPassword) {
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
            const save_auth = await getSecureItem(Constants.SecureStore.SavedAuth)
            await setSecureItem(Constants.SecureStore.SavedAuth, {
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
        <>
            {status === 'loading' && <Loading />}
            {status === 'error' && <NotFound message='Có lỗi xảy ra, vui lòng thử lại' />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ backgroundColor: Colors.white }}>
                    <PageHeader title={'Đổi mật khẩu'} />
                    {status === 'idle' && (
                        <View style={styles.container}>
                            <TextInputBox
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                inputProps={{ secureTextEntry: true }}
                                label={'Mật khẩu hiện tại'}
                                placeholder='Nhập mật khẩu hiện tại'
                            />
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
        </>
    )
}

export default DangKyDoanhNghiep

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        gap: 10,
        paddingHorizontal: 16,
    },
    background: {
        position: 'absolute',
        height,
        width,
        resizeMode: 'cover',
    },
})
