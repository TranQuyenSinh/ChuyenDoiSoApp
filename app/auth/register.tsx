import React, { useEffect, useLayoutEffect, useState } from 'react'

import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'

import PageHeader from '@components/View/PageHeader'
// @ts-ignore
import background from '@assets/images/background_blur.jpg'
// @ts-ignore
import logo from '@assets/images/logo.jpg'

import BackgroundImage from '@components/View/BackgroundImage'
import { Text } from '@components/View/Text'
import Colors from '@constants/Colors'
import Button from '@components/View/Button'
import { createUser } from '@services/doanhNghiepServices'
import { toast } from '@utils/toast'
import Loading from '@components/StatusPage/Loading'
import { axios } from '@utils/axios'

interface AutoFillData {
    id: number
    name: string
    address: string
    phone: string
    ghichu: string
}

const Register = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        dnName: '',
        password: '',
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    const validate = () => {
        const { name, dnName, phone, password } = form
        if (!name || !phone || !dnName || !password) return false
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
        const { name, email, phone, dnName, password } = form
        const result = await createUser({ name, email, phone, dnName, password })
        if (result) {
            toast('Đăng ký tài khoản thành công')
            router.back()
        }
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <ScrollView style={{ flex: 1 }}>
                <BackgroundImage source={background} />
                {loading && <Loading />}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <PageHeader title='Đăng ký tài khoản' />
                        <View style={styles.imageContainer}>
                            <Image
                                source={logo}
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
                        <View style={inputStyles.container}>
                            <Text style={inputStyles.label}>Điện thoại</Text>
                            <TextInput
                                value={form.phone}
                                onChangeText={text => setForm({ ...form, phone: text })}
                                autoCapitalize='words'
                                keyboardType='number-pad'
                                style={inputStyles.input}
                            />
                            <Text style={inputStyles.label}>Họ tên</Text>
                            <TextInput
                                value={form.name}
                                onChangeText={text => setForm({ ...form, name: text })}
                                autoCapitalize='words'
                                style={inputStyles.input}
                            />
                            <Text style={inputStyles.label}>Tên doanh nghiệp</Text>
                            <TextInput
                                value={form.dnName}
                                onChangeText={text => setForm({ ...form, dnName: text })}
                                autoCapitalize='words'
                                style={inputStyles.input}
                            />
                            <Text style={inputStyles.label}>Email</Text>
                            <TextInput
                                value={form.email}
                                onChangeText={text => setForm({ ...form, email: text })}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                style={inputStyles.input}
                            />
                            <Text style={inputStyles.label}>Mật khẩu</Text>
                            <TextInput
                                value={form.password}
                                onChangeText={text => setForm({ ...form, password: text })}
                                secureTextEntry
                                style={inputStyles.input}
                            />
                            <Button btnStyles={inputStyles.button} text='Đăng ký' onPress={handleSubmit} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 6,
        marginHorizontal: 24,
        marginVertical: 12,
    },
    label: {
        fontWeight: '500',
        marginTop: 4,
    },
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.default,
        height: 40,
        paddingLeft: 12,
        marginTop: 0,
        paddingTop: 0,
    },
    button: {
        marginTop: 12,
    },
})
