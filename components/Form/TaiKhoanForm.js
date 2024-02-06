import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouter, useNavigation } from 'expo-router'
import { StyleSheet, ScrollView, Pressable } from 'react-native'
import { Text, View } from 'react-native'

import { linkStyles, textStyles } from '@constants/Styles'
import Button from '@components/Button'
import { toast } from '@utils/toast'
import dangKySlice from '@redux/dangKySlice'
import TextInputBox from '@components/Input/InputBox'
import { formStyles } from './formStyles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'

const TaiKhoanForm = ({ onNextPage }) => {
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)

    const { formUser } = useSelector(state => state.dangKy)
    const { setFormUser } = dangKySlice.actions

    const handleChangeText = (text, field) => {
        dispatch(setFormUser({ [field]: text }))
    }

    const validate = () => {
        const { name, email, password, rePassword } = formUser
        if (!email || !password || !rePassword || !name) {
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
        onNextPage()
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={formStyles.sectionContainer}>
                <Text style={formStyles.sectionTitle}>Đăng ký tài khoản</Text>
                <TextInputBox
                    value={formUser.name}
                    onChangeText={text => handleChangeText(text, 'name')}
                    label={'Họ tên'}
                />
                <TextInputBox
                    inputProps={{
                        autoCapitalize: 'none',
                        keyboardType: 'email-address',
                    }}
                    value={formUser.email}
                    onChangeText={text => handleChangeText(text, 'email')}
                    label={'Email'}
                />
                <View>
                    <TextInputBox
                        inputProps={{
                            autoCapitalize: 'none',
                            secureTextEntry: hidePassword,
                        }}
                        value={formUser.password}
                        onChangeText={text => handleChangeText(text, 'password')}
                        label={'Mật khẩu'}
                    />
                    <Pressable
                        style={{ position: 'absolute', right: 12, top: 24 }}
                        onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons
                            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color={Colors.bodyText}
                        />
                    </Pressable>
                </View>
                <TextInputBox
                    inputProps={{
                        autoCapitalize: 'none',
                        secureTextEntry: hidePassword,
                    }}
                    value={formUser.rePassword}
                    onChangeText={text => handleChangeText(text, 'rePassword')}
                    label={'Nhập lại mật khẩu'}
                />
            </View>
            <Button
                text={'Tiếp tục'}
                onPress={handleDangKy}
                btnStyles={{ height: 45, width: '80%', alignSelf: 'center', borderRadius: 20, marginBottom: 16 }}
            />
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
