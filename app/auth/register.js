import { useState, useEffect, useLayoutEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link, useRouter, useNavigation } from 'expo-router'
import { Alert, TextInput, StyleSheet, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import { Text, View, Image, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native'

import Colors from '@constants/Colors'
import Constants from '@constants/Constants'
import { useDangNhap } from '@hooks/useDangNhap'
import googleIcon from '@assets/icons/google.png'
import useSinhTracHoc from '@hooks/useSinhTracHoc'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { linkStyles, textStyles, defaultStyles } from '@constants/Styles'
import PageHeader from '@components/View/PageHeader'
import Button from '@components/Button'
import { dangKyUser } from '@services/userServices'
import { toast } from '@utils/toast'

const { width, height } = Dimensions.get('screen')

const Register = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const userStore = useSelector(state => state.user)
    const { isLoggedIn } = userStore

    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [hoTen, setHoTen] = useState('')

    const validate = () => {
        if (!email || !password || !rePassword || !hoTen) {
            toast('Nhập đầy đủ các trường')
            return false
        }
        if (password.length < 8) {
            toast('Mật khẩu tối thiểu 8 ký tự')
            return false
        }
        if (password !== rePassword) {
            toast('Mật khẩu nhập lại không đúng')
            return false
        }
        return true
    }

    const handleDangKy = async () => {
        if (!validate()) return
        try {
            await dangKyUser({ email, hoTen, password })
            toast('Đăng ký thành công')
            router.push('auth/login')
        } catch (err) {
            toast(err.message)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
        })
    }, [navigation])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[authStyles.container, { paddingTop: 40 }]}>
                {/* TOP */}
                <PageHeader title={'Đăng ký tài khoản'} />
                <View>
                    <Text style={authStyles.label}>
                        Họ tên
                        <Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        style={[defaultStyles.inputField]}
                        value={hoTen}
                        onChangeText={text => setHoTen(text)}
                    />
                </View>
                <View>
                    <Text style={authStyles.label}>
                        Email
                        <Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={[defaultStyles.inputField]}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View>
                    <Text style={authStyles.label}>
                        Mật khẩu<Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        secureTextEntry={hidePassword}
                        style={[defaultStyles.inputField]}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Pressable style={authStyles.hidePasswordBtn} onPress={() => setHidePassword(!hidePassword)}>
                        {hidePassword ? (
                            <Ionicons name='eye-outline' size={24} color={Colors.bodyText} />
                        ) : (
                            <Ionicons name='eye-off-outline' size={24} color={Colors.bodyText} />
                        )}
                    </Pressable>
                </View>
                <View>
                    <Text style={authStyles.label}>
                        Nhập lại mật khẩu<Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        secureTextEntry={hidePassword}
                        style={[defaultStyles.inputField]}
                        value={rePassword}
                        onChangeText={text => setRePassword(text)}
                    />
                </View>
                <Button
                    text={'Đăng ký'}
                    onPress={handleDangKy}
                    btnStyles={{ height: 45, width: '80%', alignSelf: 'center', borderRadius: 20 }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={textStyles.small}>
                        đã có tài khoản?{' '}
                        <Link href={'/auth/login'} asChild>
                            <Text style={linkStyles.small}>Đăng nhập ngay</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Register

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
