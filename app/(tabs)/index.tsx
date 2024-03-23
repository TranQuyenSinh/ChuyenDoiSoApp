import { PropsWithChildren } from 'react'

import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native'

import Colors from '@constants/Colors'
import { RootState } from '@redux/store'
import { textStyles } from '@constants/Styles'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import TinTucCarousel2 from '@components/TinTuc/Carousel/TinTucCarousel2'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

// @ts-ignore
import logo from '@assets/images/logo_cds.jpg'
import { StatusBar } from 'expo-status-bar'
export default function TrangTin() {
    const router = useRouter()
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                <Image source={logo} style={styles.topImage} />
                {isLoggedIn && userProfile && <Text style={styles.topText}>Xin chào, {userProfile?.name}</Text>}
                {!isLoggedIn && (
                    <Pressable onPress={() => router.push('/auth/login')}>
                        <Text style={[styles.topText, {}]}>Đăng nhập</Text>
                    </Pressable>
                )}
            </SafeAreaView>
            <TinTucCarousel2 />
            <ScrollView style={{ marginBottom: 16 }} showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <Text style={textStyles.title}>Thông tin - Tin tức</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <GradientButton onPress={() => router.push('/news')} colors={['#64a3f5', '#286df7']}>
                            <FontAwesome style={styles.btnIcon} name='newspaper-o' />
                            <Text style={styles.btnText}>Tin tức chuyển đổi số</Text>
                        </GradientButton>
                        <GradientButton onPress={() => router.push('/news/video')} colors={['#f67979', '#fa2323']}>
                            <FontAwesome style={styles.btnIcon} name='youtube-play' />
                            <Text style={styles.btnText}>Video về chuyển đổi số</Text>
                        </GradientButton>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={textStyles.title}>Khảo sát mức độ chuyển đổi số</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <GradientButton onPress={() => router.push('/web/khaosat')} colors={['#fdcd6b', '#fe8b5f']}>
                            <MaterialIcons style={styles.btnIcon} name='track-changes' />
                            <Text style={styles.btnText}>Thực hiện khảo sát</Text>
                        </GradientButton>
                        <GradientButton
                            onPress={() => router.push('/chuyengia/hoidap')}
                            colors={['#bd96fe', '#8b48fe']}>
                            <Ionicons style={styles.btnIcon} name='chatbox-ellipses-outline' />
                            <Text style={styles.btnText}>Hỏi đáp chuyên gia</Text>
                        </GradientButton>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={textStyles.title}>Dịch vụ khác</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <GradientButton
                            onPress={() => {
                                router.push('/web/chatbot')
                            }}
                            colors={['#c40494', '#280488']}>
                            <MaterialCommunityIcons style={styles.btnIcon} name='robot-outline' />
                            <Text style={styles.btnText}>Chat bot tư vấn chuyển đổi số</Text>
                        </GradientButton>
                        <GradientButton
                            onPress={() => {
                                router.push('/web/dacsan')
                            }}
                            colors={['#d4db5a', '#39d162']}>
                            <Feather style={styles.btnIcon} name='star' size={24} color='black' />
                            <Text style={styles.btnText}>Đặc sản an giang</Text>
                        </GradientButton>
                    </View>
                </View>

                <ThongKeCDSPieChart />
            </ScrollView>
            <StatusBar style='light' />
        </View>
    )
}

interface GradienButtonProps {
    colors: string[]
    onPress?: () => void
}

const GradientButton = (props: PropsWithChildren<GradienButtonProps>) => {
    const { colors, onPress, children } = props
    return (
        <LinearGradient style={styles.btnContainer} colors={colors} start={{ x: 0, y: 0 }}>
            <Pressable android_ripple={{ color: 'white' }} style={styles.btnPressItem} onPress={onPress}>
                {children}
            </Pressable>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexShrink: 0,
        alignItems: 'center',
        backgroundColor: '#76b2ff',
    },
    topImage: {
        width: 75,
        height: 50,
        resizeMode: 'cover',
    },
    topText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '500',
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'right',
    },
    contentContainer: {
        marginHorizontal: 16,
    },
    btnContainer: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
    },
    btnPressItem: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        flexDirection: 'column',
    },
    btnIcon: {
        fontSize: 50,
        color: Colors.white,
    },
    btnText: {
        color: Colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        // flex: 1,
    },
})
