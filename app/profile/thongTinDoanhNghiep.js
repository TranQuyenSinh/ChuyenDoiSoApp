import { useAuth, useUser } from '@clerk/clerk-expo'
import Button, { GradienButton } from '@components/Button'
import Colors from '@constants/Colors'
import { defaultStyles, textStyles } from '@constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useDangNhap } from '@hooks/useDangNhap'
import userSlice from '@redux/userSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useNavigation, useRouter } from 'expo-router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import user_icon from '@assets/icons/user.png'
import PageHeader from '@components/View/PageHeader'

const ThongTinDoanhNghiep = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const [status, setStatus] = useState('idle')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <View style={[defaultStyles.container, { paddingTop: 40 }]}>
            <PageHeader title={'Thông tin doanh nghiệp'} />
            {/* {status === 'loading' && <Loading />}
            {status === 'error' && <NotFound isShownBtn={false} message='Có lỗi xảy ra, vui lòng thử lại' />} */}
            {status === 'idle' && (
                <View style={{ marginTop: 20, gap: 10 }}>
                    <Button text={'Đổi mật khẩu'} />
                </View>
            )}
        </View>
    )
}

export default ThongTinDoanhNghiep

const styles = StyleSheet.create({})
