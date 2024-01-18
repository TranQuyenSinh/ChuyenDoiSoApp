import { useState, useEffect } from 'react'

import { Link, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Text, View, Image, Keyboard, Pressable, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import googleIcon from '@assets/icons/google.png'
import facebookIcon from '@assets/icons/facebook.png'
import useWarmUpBrowser from '@hooks/useWarmUpBrowser'
import { useAuth, useUser, useOAuth } from '@clerk/clerk-expo'
import { linkStyles, textStyles, defaultStyles } from '@constants/Styles'
import userSlice, { loginWithOAuth, loginWithPassword } from '@redux/userSlice'
import * as SecureStore from 'expo-secure-store'
import { useDangNhap } from '@hooks/useDangNhap'
import Constants from '@constants/Constants'

const Page = () => {
    const router = useRouter()
    const userStore = useSelector(state => state.user)
    const { isLoggedIn, status } = userStore

    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('vn.quyensinh@gmail.com')
    const [password, setPassword] = useState('123')

    const { loginOAuth, loginWithPassword } = useDangNhap()

    useEffect(() => {
        if (isLoggedIn) {
            router.push('(tabs)')
        }
    }, [isLoggedIn])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>
                        {status}
                        <Text style={styles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        style={[defaultStyles.inputField]}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>
                        Mật khẩu<Text style={styles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        secureTextEntry={hidePassword}
                        style={[defaultStyles.inputField]}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Pressable style={styles.hidePasswordBtn} onPress={() => setHidePassword(!hidePassword)}>
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

                <View style={styles.separatorView}>
                    <View style={styles.seperatorLine} />
                    <Text style={textStyles.small}>hoặc đăng nhập bằng</Text>
                    <View style={styles.seperatorLine} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={[defaultStyles.secondaryBtn, { flex: 1 }]}
                        onPress={() => loginOAuth(Constants.Strategy.Google)}>
                        <Image source={googleIcon} style={defaultStyles.buttonIcon} />
                        <Text style={styles.btnOtherText}>Tài khoản Google</Text>
                    </TouchableOpacity>
                    {/* Login Facebook */}
                    {/* <TouchableOpacity
                        style={defaultStyles.secondaryBtn}
                        onPress={() => onSelectAuth(Strategy.Facebook)}>
                        <Image source={facebookIcon} style={defaultStyles.buttonIcon} />
                        <Text style={styles.btnOtherText}>Facebook</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={textStyles.small}>
                        chưa có tài khoản?{' '}
                        <Link href={'/'} asChild>
                            <Text style={linkStyles.small}>Đăng ký ngay</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    hidePasswordBtn: {
        position: 'absolute',
        right: 12,
        top: 33,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 24,
        gap: 16,
        paddingTop: 100,
    },
    label: {
        color: Colors.bodyText,
        marginBottom: 4,
    },
    redStar: {
        color: Colors.error.dark,
    },
    separatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    seperatorLine: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separatorText: {
        fontFamily: 'mon-sb',
        color: Colors.bodyText,
        fontSize: 14,
    },
    btnOther: {},
    btnOtherText: {},
})

export default Page
