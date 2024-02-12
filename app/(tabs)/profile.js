import { useRouter } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@constants/Colors'
import { useDangNhap } from '@hooks/useDangNhap'
import Button, { GradienButton } from '@components/Button'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SettingSection, SettingSectionItem, SettingSectionItemSeperator } from '@components/View/Section'
import avatar_default from '@assets/icons/user.png'
import { useEffect, useMemo, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import useChonAnh from '@hooks/useChonAnh'
import { renewUserProfile } from '@redux/userSlice'
import { doiAvatar } from '@services/accountServices'
import { toast } from '@utils/toast'

const Page = () => {
    const router = useRouter()
    const { isLoggedIn, userProfile } = useSelector(state => state.user)
    const { logOut } = useDangNhap()

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background.default, flex: 1 }}>
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

    useEffect(() => {
        console.log('===> ', userProfile)
    }, [userProfile])

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
                        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
                            <View>
                                <Image
                                    source={userProfile.image ? { uri: userProfile.image } : avatar_default}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50,
                                        resizeMode: 'cover',
                                        borderWidth: 2,
                                        borderColor: Colors.disableInput,
                                    }}
                                />
                                <Pressable
                                    onPress={() => modalRef.current?.present()}
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <Ionicons name='camera-reverse-sharp' size={20} color={Colors.textGray} />
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
                        // onDismiss={() => toggle(false)}
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
