import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '@constants/Colors'
import { defaultStyles } from '@constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useDangNhap } from '@hooks/useDangNhap'
import userSlice from '@redux/userSlice'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
// import * as ImagePicker from 'expo-image-picker'

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    // const { signOut, isSignedIn } = useAuth()
    // const { user } = useUser()
    // const [firstName, setFirstName] = useState(user?.firstName)
    // const [lastName, setLastName] = useState(user?.lastName)
    // const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.user)
    const { isLoggedIn } = user
    const { logOut } = useDangNhap()

    // const onSaveUser = async () => {
    //     try {
    //         if (!firstName || !lastName) return
    //         await user?.update({
    //             firstName,
    //             lastName,
    //         })
    //     } catch (e) {
    //         console.error(JSON.stringify(e, null, 2))
    //     } finally {
    //         setEdit(false)
    //     }
    // }

    // const onCaptureImage = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         quality: 0.7,
    //         base64: true,
    //     })
    //     if (!result.canceled) {
    //         const base64 = `data:image/png;base64,${result.assets[0].base64}`
    //         user?.setProfileImage({
    //             file: base64,
    //         })
    //     }
    // }

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <Link href={'/(modals)/settings'} asChild>
                    <Ionicons name='ios-settings-outline' size={26} />
                </Link>
            </View>

            {user && (
                <View style={styles.card}>
                    {/* <TouchableOpacity onPress={onCaptureImage}>
                        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
                    </TouchableOpacity> */}
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        {edit ? (
                            <>
                                <View style={styles.editRow}>
                                    <TextInput
                                        placeholder='Last name'
                                        // value={lastName || ''}
                                        // onChangeText={setLastName}
                                        style={[defaultStyles.inputField, { width: 100 }]}
                                    />
                                    <TextInput
                                        placeholder='First name'
                                        // value={firstName || ''}
                                        // onChangeText={setFirstName}
                                        style={[defaultStyles.inputField, { width: 100 }]}
                                    />
                                    <TouchableOpacity onPress={onSaveUser}>
                                        <Ionicons name='checkmark-outline' size={24} color={Colors.dark} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View style={styles.editRow}>
                                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                                    {/* {lastName} {firstName} */}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons name='create-outline' size={24} color={Colors.dark} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {/* <Text>{email}</Text> */}
                    {/* <Text>Since {user?.createdAt?.toLocaleDateString()}</Text> */}
                </View>
            )}

            {isLoggedIn && <Button color={Colors.dark} title='Log out' onPress={logOut} />}
            {!isLoggedIn && (
                <TouchableOpacity style={defaultStyles.primaryBtn} onPress={() => router.push('/auth/login')}>
                    <Text style={defaultStyles.btnText}>Đăng nhập</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
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
        paddingVertical: 24,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    editRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        height: 50,
    },
})

export default Page
