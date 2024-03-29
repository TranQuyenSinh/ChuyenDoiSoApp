import { useRef, useMemo, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { toast } from '@utils/toast'
import Colors from '@constants/Colors'
import useChonAnh from '@hooks/useChonAnh'
import { useDangNhap } from '@hooks/useDangNhap'
import avatar_default from '@assets/icons/user.jpg'
import { renewUserProfile } from '@redux/userSlice'
import { doiAvatar } from '@services/accountServices'
import Button, { GradienButton } from '@components/View/Button'
import TabPageHeader from '@components/View/TabPageHeader'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { SettingSection, SettingSectionItem, SettingSectionItemSeperator } from '@components/View/Section'

const Page = () => {
    const router = useRouter()
    const { isLoggedIn, userProfile } = useSelector(state => state.user)
    const { logOut } = useDangNhap()

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background.default, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Cài đặt'} />
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
                            onPress={() => router.push('profile/thongTinDoanhNghiep')}
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

const ProfileItem = () => {
    const dispatch = useDispatch()
    const snapPoints = useMemo(() => ['15%'], [])
    const modalRef = useRef(null)
    const { isLoggedIn, userProfile } = useSelector(state => state.user)
    const { pickImageAsync } = useChonAnh()

    const handleChangeAvatar = async pickImageFrom => {
        const imgInfo = await pickImageAsync(pickImageFrom)
        if (imgInfo) {
            const result = await doiAvatar(imgInfo)
            if (result) {
                toast('Thay đổi ảnh đại diện thành công')
                dispatch(renewUserProfile())
            } else {
                toast('Có lỗi xảy ra')
            }
        }
        modalRef.current?.dismiss()
    }
    return (
        <>
            {isLoggedIn && userProfile && (
                <>
                    <SettingSection containerStyles={{ paddingTop: 0 }}>
                        <View style={styles.profileContainer}>
                            <View>
                                <Pressable onPress={() => modalRef.current?.present()}>
                                    <Image
                                        source={userProfile.image ? { uri: userProfile.image } : avatar_default}
                                        style={styles.avatar}
                                    />
                                    <Ionicons
                                        style={{ position: 'absolute', bottom: -8, right: -4 }}
                                        name='camera-reverse-sharp'
                                        size={20}
                                        color={Colors.textGray}
                                    />
                                </Pressable>
                            </View>
                            <View style={{ gap: 3 }}>
                                <View style={{ flexDirection: 'row', gap: 3 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userProfile.name}</Text>
                                    <MaterialCommunityIcons name='pencil' size={20} color={Colors.bodyText} />
                                </View>
                                <Text style={{ color: Colors.textGray }}>{userProfile.email}</Text>
                            </View>
                        </View>
                    </SettingSection>
                    <BottomSheetModal
                        ref={modalRef}
                        overDragResistanceFactor={0}
                        snapPoints={snapPoints}
                        backdropComponent={props => (
                            <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
                        )}
                        handleIndicatorStyle={{ display: 'none' }}
                        backgroundStyle={{ backgroundColor: Colors.lightGrey }}>
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 12,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 16,
                            }}>
                            <Button
                                onPress={() => handleChangeAvatar('galery')}
                                text='Thư viện'
                                renderIcon={<Ionicons name='image-sharp' size={24} color={Colors.white} />}
                                btnStyles={{ minWidth: 120 }}
                            />
                            <Button
                                onPress={() => handleChangeAvatar('camera')}
                                text='Máy ảnh'
                                renderIcon={<Ionicons name='camera-sharp' size={24} color={Colors.white} />}
                                btnStyles={{ minWidth: 120 }}
                            />
                        </View>
                    </BottomSheetModal>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: Colors.disableInput,
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        padding: 12,
    },
})

export default Page
