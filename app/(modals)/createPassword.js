import {
    Keyboard,
    Pressable,
    SectionList,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { defaultStyles, textStyles } from '@constants/Styles'
import Colors from '@constants/Colors'
import { Stack } from 'expo-router'
import loginSlice from '@redux/loginSlice'
import userSlice, { loginWithOAuth } from '@redux/userSlice'
import * as UserServices from '@services/userServices'
import { useDispatch, useSelector } from 'react-redux'

const CreatePasswordPage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const loginStore = useSelector(state => state.login)
    const { providerName, clerkUser } = loginStore
    const dispatch = useDispatch()
    const handleCreatePassword = async () => {
        if (!password || !confirmPassword) {
            ToastAndroid.showWithGravity('Vui lòng nhập đầy đủ', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            return
        }
        if (password !== confirmPassword) {
            ToastAndroid.showWithGravity('Mật khẩu nhập lại không chính xác', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            return
        }
        let loginInfo = {
            providerName,
            providerKey: clerkUser.id,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            password,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            photo: clerkUser.imageUrl,
        }
        console.log('start call create service ')
        await UserServices.createOAuthPassword(loginInfo)

        console.log('start dispatch login oauth')
        dispatch(loginWithOAuth(loginInfo))
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={[defaultStyles.container, styles.container]}>
                    <Text style={textStyles.large}>Tạo mật khẩu cho lần đăng nhập sau</Text>
                    <View>
                        <Text style={styles.label}>
                            Nhập mật khẩu mới<Text style={styles.redStar}>*</Text>
                        </Text>
                        <TextInput
                            autoCapitalize='none'
                            style={[defaultStyles.inputField]}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>
                            Xác nhận mật khẩu mới<Text style={styles.redStar}>*</Text>
                        </Text>
                        <TextInput
                            autoCapitalize='none'
                            style={[defaultStyles.inputField]}
                            value={confirmPassword}
                            secureTextEntry={true}
                            onChangeText={text => setConfirmPassword(text)}
                        />
                    </View>
                    <Pressable onPress={handleCreatePassword} style={defaultStyles.btn}>
                        <Text style={defaultStyles.btnText}>Xác nhận</Text>
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        gap: 16,
    },
    label: {
        color: Colors.bodyText,
        marginBottom: 4,
    },
    redStar: {
        color: Colors.error.dark,
    },
})

export default CreatePasswordPage
