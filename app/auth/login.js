import { useState, useEffect, useLayoutEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link, useRouter, useNavigation } from 'expo-router'
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View, Image, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native'

import Colors from '@constants/Colors'
import Constants from '@constants/Constants'
import { useDangNhap } from '@hooks/useDangNhap'
import googleIcon from '@assets/icons/google.png'
import useSinhTracHoc from '@hooks/useSinhTracHoc'
import { Entypo, Ionicons } from '@expo/vector-icons'
import facebookIcon from '@assets/icons/facebook.png'
import { linkStyles, textStyles, defaultStyles } from '@constants/Styles'

import authStyles from './authStyles'
import Loading from '@components/StatusPage/Loading'

const Page = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const { isLoggedIn, loading } = useSelector(state => state.user)

    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { bioAuthenticate } = useSinhTracHoc()
    const { loginOAuth, loginWithPassword } = useDangNhap()

    useEffect(() => {
        if (isLoggedIn) {
            router.push('(tabs)')
        }
    }, [isLoggedIn])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) return <Loading />

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={authStyles.container}>
                <View>
                    <Text style={authStyles.label}>
                        Email
                        <Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        style={[defaultStyles.inputField]}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Nhập email...'
                    />
                </View>
                <View>
                    <Text style={authStyles.label}>
                        Mật khẩu<Text style={authStyles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Nhập mật khẩu...'
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
                <TouchableOpacity onPress={() => loginWithPassword(email, password)} style={[defaultStyles.btn]}>
                    <Text style={defaultStyles.btnText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={authStyles.separatorView}>
                    <View style={authStyles.seperatorLine} />
                    <Text style={textStyles.small}>hoặc đăng nhập bằng</Text>
                    <View style={authStyles.seperatorLine} />
                </View>

                <View style={{ gap: 10, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        {/* Login Facebook */}
                        <TouchableOpacity
                            style={[defaultStyles.secondaryBtn, { flex: 1 }]}
                            onPress={() => loginOAuth(Constants.Strategy.Facebook)}>
                            <Image source={facebookIcon} style={defaultStyles.buttonIcon} />
                            <Text style={authStyles.btnOtherText}>Facebook</Text>
                        </TouchableOpacity>
                        {/* Login Google */}
                        <TouchableOpacity
                            style={[defaultStyles.secondaryBtn, { flex: 1 }]}
                            onPress={() => loginOAuth(Constants.Strategy.Google)}>
                            <Image source={googleIcon} style={defaultStyles.buttonIcon} />
                            <Text style={authStyles.btnOtherText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Login biometric */}
                    <TouchableOpacity onPress={bioAuthenticate} style={defaultStyles.secondaryBtn}>
                        <Entypo name='fingerprint' size={30} color='green' />
                        <Text style={authStyles.btnOtherText}>Đăng nhập sinh trắc học</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={textStyles.small}>
                        chưa có tài khoản?{' '}
                        <Link href={'/auth/register'} asChild>
                            <Text style={linkStyles.small}>Đăng ký ngay</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Page
