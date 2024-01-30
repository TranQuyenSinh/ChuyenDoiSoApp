import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { defaultStyles, textStyles } from '@constants/Styles'
import { useAuth } from '@clerk/clerk-expo'
import { useDispatch } from 'react-redux'
import userSlice from '@redux/userSlice'
import PageHeader from '@components/View/PageHeader'

const Settings = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { signOut, isSignedIn } = useAuth()

    const handleSignOut = () => {
        signOut()
        dispatch(userSlice.actions.logout())
        router.replace('/auth/login')
    }
    return (
        <View style={[defaultStyles.container, { gap: 16, paddingTop: 40 }]}>
            {/* Header */}
            <PageHeader title={'Cài đặt'} />
            {/* Settings */}
            <View style={styles.row}>
                <View style={styles.left}>
                    <Ionicons name='notifications-outline' size={24} color={Colors.titleActive} />
                    <Text style={[textStyles.medium, { color: Colors.titleActive, fontFamily: 'mon-sb' }]}>
                        Thông báo
                    </Text>
                </View>
                <Ionicons name='chevron-forward-outline' size={16} color={Colors.bodyText} />
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Ionicons name='lock-closed-outline' size={24} color={Colors.titleActive} />
                    <Text style={[textStyles.medium, { color: Colors.titleActive, fontFamily: 'mon-sb' }]}>
                        Bảo mật
                    </Text>
                </View>
                <Ionicons name='chevron-forward-outline' size={16} color={Colors.bodyText} />
            </View>
            {isSignedIn && (
                <TouchableOpacity onPress={handleSignOut} style={styles.row}>
                    <View style={styles.left}>
                        <Ionicons name='log-out-outline' size={24} color={Colors.titleActive} />
                        <Text style={[textStyles.medium, { color: Colors.titleActive, fontFamily: 'mon-sb' }]}>
                            Đăng xuất
                        </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={16} color={Colors.bodyText} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 24,
        gap: 16,
        paddingTop: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    left: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
})
