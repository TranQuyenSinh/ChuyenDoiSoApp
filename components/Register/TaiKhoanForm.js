import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouter, useNavigation } from 'expo-router'
import { StyleSheet, ScrollView, Pressable } from 'react-native'
import { Text, View } from 'react-native'

import { linkStyles, textStyles } from '@constants/Styles'
import Button from '@components/View/Button'
import { toast } from '@utils/toast'
import dangKySlice, { dangKyDoanhNghiep } from '@redux/dangKySlice'
import TextInputBox, { ValidateInputBox } from '@components/Input/InputBox'
import { formStyles } from './formStyles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { Field, Formik } from 'formik'
import { dangKyTaiKhoanValidate } from '@validateSchemas/registerValidate'

const TaiKhoanForm = ({ onNextPage }) => {
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)

    const { formUser } = useSelector(state => state.dangKy)
    const { setFormUser } = dangKySlice.actions

    const handleChangeText = (field, text) => {
        dispatch(setFormUser({ field, value: text }))
    }

    const handleSubmit = async () => {
        onNextPage()
    }

    useEffect(() => {
        dispatch(dangKyDoanhNghiep())
    }, [])
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={formStyles.sectionContainer}>
                <Text style={formStyles.sectionTitle}>Đăng ký tài khoản</Text>
                <View style={{ gap: 20 }}>
                    <Formik validationSchema={dangKyTaiKhoanValidate} initialValues={formUser} onSubmit={handleSubmit}>
                        {({ handleSubmit, isValid }) => (
                            <>
                                <Field
                                    component={ValidateInputBox}
                                    name='name'
                                    onChangeText={(field, text) => handleChangeText(field, text)}
                                    label={'Họ tên'}
                                    inputProps={{
                                        autoCapitalize: 'words',
                                    }}
                                />
                                <Field
                                    component={ValidateInputBox}
                                    name='email'
                                    onChangeText={(field, text) => handleChangeText(field, text)}
                                    label={'Email'}
                                    inputProps={{
                                        autoCapitalize: 'none',
                                        keyboardType: 'email-address',
                                    }}
                                />
                                <View>
                                    <Field
                                        component={ValidateInputBox}
                                        name='password'
                                        onChangeText={(field, text) => handleChangeText(field, text)}
                                        label={'Mật khẩu'}
                                        inputProps={{
                                            autoCapitalize: 'none',
                                            secureTextEntry: hidePassword,
                                        }}
                                    />
                                    <Pressable
                                        style={{ position: 'absolute', right: 12, top: 12 }}
                                        onPress={() => setHidePassword(!hidePassword)}>
                                        <Ionicons
                                            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={24}
                                            color={Colors.bodyText}
                                        />
                                    </Pressable>
                                </View>
                                <Field
                                    component={ValidateInputBox}
                                    name='rePassword'
                                    onChangeText={(field, text) => handleChangeText(field, text)}
                                    label={'Nhập lại mật khẩu'}
                                    inputProps={{
                                        autoCapitalize: 'none',
                                        secureTextEntry: hidePassword,
                                    }}
                                />
                                <Button
                                    disabled={!isValid}
                                    text={'Tiếp tục'}
                                    onPress={handleSubmit}
                                    btnStyles={{
                                        height: 45,
                                        width: '80%',
                                        alignSelf: 'center',
                                        borderRadius: 20,
                                        marginBottom: 16,
                                    }}
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={textStyles.small}>
                    đã có tài khoản?{' '}
                    <Link href={'/auth/login'} asChild>
                        <Text style={linkStyles.small}>Đăng nhập ngay</Text>
                    </Link>
                </Text>
            </View>
        </ScrollView>
    )
}

export default TaiKhoanForm

const styles = StyleSheet.create({})
