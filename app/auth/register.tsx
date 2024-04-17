import React, { useLayoutEffect, useState } from 'react'

import { Alert, Image, Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { router, useNavigation } from 'expo-router'

import PageHeader from '@components/View/PageHeader'
// @ts-ignore
import background from '@assets/images/background_blur.jpg'
// @ts-ignore
import logo from '@assets/images/logo.jpg'
// @ts-ignore
import logo_ict from '@assets/images/logo_ict_full.jpg'

import BackgroundImage from '@components/View/BackgroundImage'
import { AppDispatch } from '@redux/store'
import { Text } from '@components/View/Text'
import Colors from '@constants/Colors'
import Button from '@components/View/Button'
import { createUser } from '@services/doanhNghiepServices'
import { toast } from '@utils/toast'
import Loading from '@components/StatusPage/Loading'

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        taxCode: '',
        dnName: '',
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    const validate = () => {
        const { name, email, dnName } = form
        if (!name || !email || !dnName) return false
        return true
    }

    const handleSubmit = async () => {
        const isValid = validate()
        if (!isValid) {
            Alert.alert('Lưu ý', 'Bạn hãy vui lòng nhập đầy đủ thông tin', [{ text: 'Ok', style: 'cancel' }], {
                cancelable: true,
            })
            return
        }
        setLoading(true)
        const { name, email, taxCode, dnName } = form
        const result = await createUser({ name, email, taxCode, dnName })
        if (result) {
            toast('Đăng ký tài khoản thành công')
            router.back()
        }
        setLoading(false)
    }
    return (
        <>
            <BackgroundImage source={background} />
            {loading && <Loading />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <PageHeader title='Đăng ký tài khoản' />
                    <View style={styles.imageContainer}>
                        <Image source={logo} style={{ width: 125, height: 125, resizeMode: 'cover' }} />
                        <Text color={Colors.default} fontSize={24} fontWeight='500' align='center'>
                            Chuyển đổi số An Giang
                        </Text>
                    </View>
                    <View style={inputStyles.container}>
                        <TextInput
                            value={form.name}
                            onChangeText={text => setForm({ ...form, name: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                            placeholder='Họ tên'
                        />
                        <TextInput
                            value={form.email}
                            onChangeText={text => setForm({ ...form, email: text })}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            style={inputStyles.input}
                            placeholder='Email'
                        />
                        <TextInput
                            value={form.dnName}
                            onChangeText={text => setForm({ ...form, dnName: text })}
                            autoCapitalize='words'
                            style={inputStyles.input}
                            placeholder='Tên doanh nghiệp'
                        />
                        <TextInput
                            value={form.taxCode}
                            onChangeText={text => setForm({ ...form, taxCode: text })}
                            keyboardType='number-pad'
                            style={inputStyles.input}
                            placeholder='Mã số thuế'
                        />
                        <Button btnStyles={inputStyles.button} text='Đăng ký' onPress={handleSubmit} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 6,
        marginHorizontal: 24,
        marginVertical: 12,
    },
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.default,
        height: 50,
    },
    button: {
        marginTop: 12,
    },
})
