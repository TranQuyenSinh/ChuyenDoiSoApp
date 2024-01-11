import { Image, Keyboard, Pressable, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '@constants/Colors'
import { useOAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles, linkStyles, textStyles } from '@constants/Styles'
import useWarmUpBrowser from '@hooks/useWarmUpBrowser'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import googleIcon from '@assets/icons/google.png'
import facebookIcon from '@assets/icons/facebook.png'

const Strategy = {
    Google: 'oauth_google',
    Facebook: 'oauth_facebook',
    Apple: 'oauth_apple',
}

const Page = () => {
    const [hidePassword, setHidePassword] = useState(true)
    useWarmUpBrowser()
    const router = useRouter()

    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const onSelectAuth = async strategy => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()
            console.log(createdSessionId)
            if (createdSessionId) {
                setActive({ session: createdSessionId })
                router.replace('(tabs)')
            }
        } catch (e) {
            console.error('OAuth error: ' + e)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>
                        Tài khoản<Text style={styles.redStar}>*</Text>
                    </Text>
                    <TextInput autoCapitalize='none' style={[defaultStyles.inputField]} />
                </View>
                <View>
                    <Text style={styles.label}>
                        Mật khẩu<Text style={styles.redStar}>*</Text>
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        secureTextEntry={hidePassword}
                        style={[defaultStyles.inputField]}
                    />
                    <Pressable style={styles.hidePasswordBtn} onPress={() => setHidePassword(!hidePassword)}>
                        {hidePassword ? (
                            <Ionicons name='eye-outline' size={24} color={Colors.bodyText} />
                        ) : (
                            <Ionicons name='eye-off-outline' size={24} color={Colors.bodyText} />
                        )}
                    </Pressable>
                </View>
                <TouchableOpacity style={[defaultStyles.btn]}>
                    <Text style={defaultStyles.btnText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={styles.separatorView}>
                    <View style={styles.seperatorLine} />
                    <Text style={textStyles.small}>hoặc đăng nhập bằng</Text>
                    <View style={styles.seperatorLine} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={defaultStyles.secondaryBtn} onPress={() => onSelectAuth(Strategy.Google)}>
                        <Image source={googleIcon} style={defaultStyles.buttonIcon} />
                        <Text style={styles.btnOtherText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={defaultStyles.secondaryBtn}
                        onPress={() => onSelectAuth(Strategy.Facebook)}>
                        <Image source={facebookIcon} style={defaultStyles.buttonIcon} />
                        <Text style={styles.btnOtherText}>Facebook</Text>
                    </TouchableOpacity>
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
