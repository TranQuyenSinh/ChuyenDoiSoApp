import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { usePushNotifications } from '@hooks/usePushNotifications'
import { RootState } from '@redux/store'
import { router } from 'expo-router'
import { useSelector } from 'react-redux'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import Colors from '@constants/Colors'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import UserInfo from '@components/Profile/UserInfo'
import ProfileTopButton from '@components/Profile/ProfileTopButton'
import SettingItem, { SettingSeperator } from '@components/Profile/SettingItem'
import { useDangNhap } from '@hooks/useDangNhap'
import { ROLES } from '@constants/Constants'
const ProfileTab = () => {
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)
    const { logOut, isInRole } = useDangNhap()

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, flex: 1 }}>
                <SafeAreaView style={{ height: 175 }}>
                    <LinearGradient
                        colors={['#99d7fe', '#33acff']}
                        style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        start={{ x: 1, y: 0 }}
                    />
                    <View style={{ marginVertical: 12 }}>
                        <UserInfo />
                    </View>
                    {isInRole(ROLES.DOANH_NGHIEP) && (
                        <View style={floatStyles.container}>
                            <ProfileTopButton
                                text='Thông tin doanh nghiệp'
                                onPress={() => router.push('/profile/thongTinDoanhNghiep')}
                                icon={
                                    <MaterialCommunityIcons
                                        name='badge-account-horizontal'
                                        size={24}
                                        color={'#307afd'}
                                    />
                                }
                            />
                            <ProfileTopButton
                                text='Lịch sử khảo sát'
                                onPress={() => router.push('/khaosat')}
                                icon={
                                    <MaterialCommunityIcons name='clipboard-text-clock' size={24} color={'#307afd'} />
                                }
                            />
                            <ProfileTopButton
                                text='Ẩn hồ sơ doanh nghiệp'
                                icon={<Ionicons name='settings' size={24} color={'#307afd'} />}
                            />
                        </View>
                    )}
                </SafeAreaView>

                {isLoggedIn && (
                    <View style={[styles.body, isInRole(ROLES.CHUYEN_GIA) && { marginTop: 0 }]}>
                        <Text style={settingStyles.title}>Quản lý thông tin</Text>
                        <View style={settingStyles.section}>
                            {isInRole(ROLES.DOANH_NGHIEP) && (
                                <>
                                    <SettingItem
                                        onPress={() => router.push('/sanpham')}
                                        text='Quản lý sản phẩm'
                                        icon={<AntDesign name='staro' size={24} color={'#6a6f73'} />}
                                    />
                                    <SettingSeperator />
                                </>
                            )}
                            {(isInRole(ROLES.CHUYEN_GIA) || isInRole(ROLES.DOANH_NGHIEP)) && (
                                <SettingItem
                                    onPress={() => router.push('/social/baiviet')}
                                    text='Quản lý bài viết'
                                    icon={<Feather name='edit' size={24} color='#6a6f73' />}
                                />
                            )}
                        </View>
                        <Text style={settingStyles.title}>Khác</Text>
                        <View style={settingStyles.section}>
                            <SettingItem
                                onPress={() => router.push('/profile/doiMatKhau')}
                                text='Đổi mật khẩu'
                                icon={<Ionicons name='lock-closed-outline' size={24} color={'#6a6f73'} />}
                            />
                            <SettingSeperator />
                            <SettingItem
                                onPress={logOut}
                                text='Đăng xuất'
                                icon={<Ionicons name='log-out-outline' size={24} color={'#6a6f73'} />}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default ProfileTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    body: {
        flex: 1,
        marginTop: 90,
        backgroundColor: '#f5f8fd',
    },
})

const floatStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -75,
        left: 16,
        right: 16,
        elevation: 10,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 18,
        justifyContent: 'space-evenly',
    },
})

const settingStyles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#34404d',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 12,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        marginBottom: 12,
    },
})
