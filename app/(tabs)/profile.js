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
import user_icon from '@assets/icons/user.png'

// import * as ImagePicker from 'expo-image-picker'

const Page = () => {
    const router = useRouter()
    const { isLoggedIn } = useSelector(state => state.user)
    const { logOut } = useDangNhap()

    return (
        <SafeAreaView style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Cài đặt</Text>
                </View>
                <ProfileItem />
                {!isLoggedIn && (
                    <GradienButton
                        onPress={() => router.push('auth/login')}
                        btnStyles={{ marginHorizontal: 16, width: '40%', marginTop: 16 }}
                        text={'Đăng nhập'}
                    />
                )}

                {isLoggedIn && (
                    <SettingSection title={'Doanh nghiệp'}>
                        <SettingSectionItem
                            title={'Thông tin doanh nghiệp'}
                            onPress={() => router.push('profile/dangKyDoanhNghiep')}
                            renderIcon={() => <Ionicons name='business-outline' size={24} color={Colors.bodyText} />}
                        />
                    </SettingSection>
                )}
                {isLoggedIn && (
                    <SettingSection title={'Tài khoản'}>
                        <SettingSectionItem
                            title={'Thiết lập đăng nhập vân tay'}
                            onPress={() => router.push('profile/thietLapSinhTracHoc')}
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
            </ScrollView>
        </SafeAreaView>
    )
}

const SettingSection = ({ title, children, contentStyles, containerStyles }) => {
    return (
        <View style={[{ padding: 16 }, containerStyles]}>
            <Text style={{ marginBottom: 12, fontSize: 15 }}>{title}</Text>
            <View style={[{ backgroundColor: Colors.white, borderRadius: 6, elevation: 6 }, contentStyles]}>
                {children}
            </View>
        </View>
    )
}

const SettingSectionItem = ({ title, subTitle, onPress = () => {}, renderIcon }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {renderIcon && renderIcon()}
                <View>
                    <Text style={{ fontSize: 18 }}>{title}</Text>
                    {subTitle && <Text style={{ fontSize: 14, color: Colors.textGray }}>{subTitle}</Text>}
                </View>
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

const ProfileItem = () => {
    const { isLoggedIn, userProfile } = useSelector(state => state.user)
    return (
        <>
            {isLoggedIn && userProfile && (
                <SettingSection containerStyles={{ paddingTop: 0 }}>
                    <SettingSectionItem
                        title={'Trần Quyền Sinh'}
                        subTitle={'Xem thông tin cá nhân'}
                        renderIcon={() => (
                            <Image source={user_icon} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        )}
                    />
                </SettingSection>
            )}
        </>
    )
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
        paddingTop: 24,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
        paddingHorizontal: 16,
    },
})

export default Page
