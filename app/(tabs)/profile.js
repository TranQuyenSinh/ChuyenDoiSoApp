import { useAuth, useUser } from '@clerk/clerk-expo'
import { GradienButton } from '@components/Button'
import Colors from '@constants/Colors'
import { defaultStyles, textStyles } from '@constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useDangNhap } from '@hooks/useDangNhap'
import userSlice from '@redux/userSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
// import * as ImagePicker from 'expo-image-picker'

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.user)
    const { isLoggedIn } = user
    const { logOut } = useDangNhap()

    return (
        <SafeAreaView style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Cài đặt</Text>
                </View>
                {!isLoggedIn && (
                    <GradienButton
                        onPress={() => router.push('auth/login')}
                        btnStyles={{ marginHorizontal: 16, width: '40%' }}
                        text={'Đăng nhập'}
                    />
                )}
                {isLoggedIn && (
                    <SettingSection title={'Tài khoản'}>
                        <SettingSectionItem
                            title={'Thiết lập đăng nhập vân tay'}
                            renderIcon={() => (
                                <Ionicons name='finger-print-outline' size={24} color={Colors.bodyText} />
                            )}
                        />
                        <SettingSectionItemSeperator />
                        <SettingSectionItem
                            title={'Đổi mật khẩu'}
                            onPress={() => router.push('profile/doiMatKhau')}
                            renderIcon={() => <Ionicons name='lock-closed-outline' size={24} color={Colors.bodyText} />}
                        />
                        <SettingSectionItemSeperator />
                        <SettingSectionItem
                            title={'Đăng xuất'}
                            renderIcon={() => <Ionicons name='log-out-outline' size={24} color={Colors.bodyText} />}
                            onPress={logOut}
                        />
                    </SettingSection>
                )}
                {/* {isLoggedIn && <Button color={Colors.dark} title='Log out' onPress={logOut} />}
            {!isLoggedIn && (
                <TouchableOpacity style={defaultStyles.primaryBtn} onPress={() => router.push('/auth/login')}>
                    <Text style={defaultStyles.btnText}>Đăng nhập</Text>
                </TouchableOpacity>
            )} */}
            </ScrollView>
        </SafeAreaView>
    )
}

const SettingSection = ({ title, children }) => {
    return (
        <View style={{ padding: 16 }}>
            <Text style={{ marginBottom: 12, fontSize: 15 }}>{title}</Text>
            <View style={{ backgroundColor: Colors.white, borderRadius: 6, elevation: 6 }}>{children}</View>
        </View>
    )
}

const SettingSectionItem = ({ title, onPress = () => {}, renderIcon }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {renderIcon()}
                <Text style={{ fontSize: 18 }}>{title}</Text>
            </View>
            <View>
                <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
            </View>
        </TouchableOpacity>
    )
}

const SettingSectionItemSeperator = () => {
    return <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
        paddingHorizontal: 16,
    },
})

export default Page
