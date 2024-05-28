import React, { useState, useEffect, useLayoutEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link, useRouter, useNavigation } from 'expo-router'
import { TextInput, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Text, View, Image, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native'

import Colors from '@constants/Colors'
import Constants from '@constants/Constants'
import { useDangNhap } from '@hooks/useDangNhap'
import googleIcon from '@assets/icons/google.jpg'
import useSinhTracHoc from '@hooks/useSinhTracHoc'
import { Entypo, Ionicons } from '@expo/vector-icons'
import facebookIcon from '@assets/icons/facebook.jpg'
import { linkStyles, textStyles, defaultStyles } from '@constants/Styles'
import authStyles from './authStyles'
import login from '@assets/images/logo.jpg'
import Loading from '@components/StatusPage/Loading'
import background from '@assets/images/background_blur.jpg'
import RowComponent from '@components/View/RowComponent'
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
            <React.Fragment>
                <Image
                    source={background}
                    style={[
                        {
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        },
                        StyleSheet.absoluteFill,
                    ]}
                />
                <View style={authStyles.container}>
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={login}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'cover',
                                paddingVertical: 50,
                            }}
                        />
                        <Text style={{ fontSize: 20, color: '#00549c', fontWeight: 'bold' }}>
                            Chuyển đổi số {'\n'}Doanh nghiệp An Giang
                        </Text>
                    </View>
                    <View>
                        <Text style={authStyles.label}>
                            Điện thoại hoặc email
                            <Text style={authStyles.redStar}>*</Text>
                        </Text>
                        <TextInput
                            style={[defaultStyles.inputField]}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder=''
                        />
                    </View>
                    <View>
                        <Text style={authStyles.label}>
                            Mật khẩu<Text style={authStyles.redStar}>*</Text>
                        </Text>
                        <TextInput
                            autoCapitalize='none'
                            placeholder=''
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

                    <RowComponent gap={4}>
                        <TouchableOpacity onPress={() => loginWithPassword('antesco@antesco.com', '12345678')} style={[defaultStyles.btn, { flex: 1 }]}>
                            <Text style={[defaultStyles.btnText, { fontSize: 14 }]}>Doanh nghiệp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => loginWithPassword('chuyengia@gmail.com', '12345678')} style={[defaultStyles.btn, { flex: 1 }]}>
                            <Text style={[defaultStyles.btnText, { fontSize: 14 }]}>Chuyên gia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => loginWithPassword('admin@gmail.com', '12345678')} style={[defaultStyles.btn, { flex: 1 }]}>
                            <Text style={[defaultStyles.btnText, { fontSize: 14 }]}>Hiệp hội</Text>
                        </TouchableOpacity>
                    </RowComponent>

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
                        {/* <TouchableOpacity onPress={bioAuthenticate} style={defaultStyles.secondaryBtn}>
                            <Entypo name='fingerprint' size={30} color='green' />
                            <Text style={authStyles.btnOtherText}>Đăng nhập sinh trắc học</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={textStyles.small}>
                            chưa có tài khoản?{' '}
                            <Link href={'/auth/register'} asChild>
                                <Text style={linkStyles.small}>Đăng ký ngay</Text>
                            </Link>
                        </Text>
                    </View>
                    <StatusBar barStyle={'dark-content'} />
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    )
}

export default Page
