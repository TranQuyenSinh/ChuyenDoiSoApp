import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { AppDispatch, RootState } from '@redux/store'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import useChonAnh from '@hooks/useChonAnh'
import useToggle from '@hooks/useToggle'
import { renewUserProfile } from '@redux/userSlice'
import { doiTenUser, doiAvatar } from '@services/accountServices'
import { toast } from '@utils/toast'
import PickImageModal from '@components/View/PickImageModal'
import Modal from '@components/View/Modal'
import Button from '@components/View/Button'
import IconButton from '@components/View/IconButton'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
const UserInfo = () => {
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const { isOpen, toggle } = useToggle()
    const { isOpen: isOpenName, toggle: toggleName } = useToggle()

    const handleChangeAvatar = async (imgInfo: any) => {
        if (imgInfo) {
            const result = await doiAvatar(imgInfo)
            if (result) {
                toast('Thay đổi ảnh đại diện thành công')
                dispatch(renewUserProfile())
            } else {
                toast('Có lỗi xảy ra')
            }
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => isLoggedIn && toggle(true)}>
                <Image source={userProfile?.image ? { uri: userProfile?.image } : no_avatar} style={styles.image} />
            </Pressable>
            {isLoggedIn && (
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={styles.userInfo}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{userProfile?.name}</Text>
                            <IconButton onPress={() => toggleName(true)}>
                                <MaterialIcons name='edit' size={20} color={'white'} />
                            </IconButton>
                        </View>
                        <Text style={{ color: 'white', fontSize: 14 }}>{userProfile?.email}</Text>
                    </View>
                </View>
            )}
            {!isLoggedIn && (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Pressable onPress={() => router.push('/auth/login')}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Đăng nhập / </Text>
                    </Pressable>
                    <Pressable onPress={() => router.push('/auth/register')}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Đăng ký</Text>
                    </Pressable>
                </View>
            )}
            <PickImageModal isOpen={isOpen} toggle={toggle} onPickAsync={handleChangeAvatar} />
            <EditNameModal isOpen={isOpenName} toggle={toggleName} />
        </View>
    )
}
interface EditNameModalProps {
    isOpen: boolean
    toggle: (value: boolean) => void
}

const EditNameModal = (props: EditNameModalProps) => {
    const { isOpen, toggle } = props
    const [name, setName] = useState('')
    const dispatch = useDispatch<AppDispatch>()

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

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <TextInput
                placeholder='Nhập tên mới'
                style={modalStyles.modalInput}
                value={name}
                onChangeText={text => setName(text)}
                autoCapitalize='words'
            />
            <Button btnStyles={{ width: '100%', marginTop: 12 }} text='Xác nhận' onPress={handleChangeName} />
        </Modal>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
    },

    userInfo: {
        // gap: 2,
    },
    body: {
        marginTop: 75,
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    name: {
        fontWeight: '600',
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 15,
    },
})

const modalStyles = StyleSheet.create({
    modalInput: {
        borderWidth: StyleSheet.hairlineWidth,
        width: '100%',
        borderRadius: 8,
        padding: 8,
        textAlign: 'center',
    },
})
