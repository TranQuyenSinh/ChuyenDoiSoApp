import { useRef, useMemo, useEffect, useState } from 'react'

import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { toast } from '@utils/toast'
import Colors from '@constants/Colors'
import useChonAnh from '@hooks/useChonAnh'
import { useDangNhap } from '@hooks/useDangNhap'
import avatar_default from '@assets/icons/user.jpg'
import { renewUserProfile } from '@redux/userSlice'
import { doiAvatar, doiTenUser } from '@services/accountServices'
import Button, { GradienButton } from '@components/View/Button'
import TabPageHeader from '@components/View/TabPageHeader'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { SettingSection, SettingSectionItem, SettingSectionItemSeperator } from '@components/View/Section'
import Constants from '@constants/Constants'
import Modal from '@components/View/Modal'
import useToggle from '@hooks/useToggle'
import IconButton from '@components/View/IconButton'

const Page = () => {
    const router = useRouter()
    const { isLoggedIn, userProfile } = useSelector(state => state.user)
    const { logOut } = useDangNhap()

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background.default, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileItem />
                {!isLoggedIn && (
                    <GradienButton
                        onPress={() => router.push('auth/login')}
                        btnStyles={{ marginHorizontal: 16, width: '40%', marginTop: 16 }}
                        text={'Đăng nhập'}
                    />
                )}

                {isLoggedIn && userProfile?.vaitro?.[0]?.id === Constants.Role.DoanhNghiep && (
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
    const { isOpen, toggle } = useToggle()
    const [name, setName] = useState('')
    const handleChangeName = async () => {
        if (!name) {
            toast('Tên không được bỏ trống')
            return
        }
        const result = await doiTenUser(name)
        if (result) {
            toast('Thay đổi thành công')
            dispatch(renewUserProfile())
        } else {
            toast('Có lỗi xảy ra')
        }
        dispatch(renewUserProfile())
        toggle(false)
    }
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
                                    <IconButton onPress={() => toggle(true)}>
                                        <MaterialCommunityIcons name='pencil' size={20} color={Colors.bodyText} />
                                    </IconButton>
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

                    {/* Change Name Modal */}
                    <Modal isOpen={isOpen} toggle={toggle}>
                        <TextInput
                            placeholder='Nhập tên mới'
                            style={styles.modalInput}
                            value={name}
                            onChangeText={text => setName(text)}
                            autoCapitalize='words'
                        />
                        <Button
                            btnStyles={{ width: '100%', marginTop: 12 }}
                            text='Xác nhận'
                            onPress={handleChangeName}
                        />
                    </Modal>
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
    modalInput: {
        borderWidth: StyleSheet.hairlineWidth,
        width: '100%',
        borderRadius: 8,
        padding: 8,
        textAlign: 'center',
    },
})

export default Page
