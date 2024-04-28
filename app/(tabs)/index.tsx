import { router, useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native'

import Colors from '@constants/Colors'
import { RootState } from '@redux/store'
import { textStyles } from '@constants/Styles'

//@ts-ignore
import nhucau from '@assets/icons/home/nhucau.png'
//@ts-ignore
import chuyengia from '@assets/icons/home/chuyengia.png'
//@ts-ignore
import tintuc from '@assets/icons/home/tintuc.png'
//@ts-ignore
import video from '@assets/icons/home/video.png'
//@ts-ignore
import document from '@assets/icons/home/document.png'
//@ts-ignore
import hoidap from '@assets/icons/home/hoidap.png'

//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'

// @ts-ignore
import news from '@assets/icons/news.png'

// @ts-ignore
import survey from '@assets/icons/survey.png'
// @ts-ignore
import result from '@assets/icons/result.png'
// @ts-ignore
import exper from '@assets/icons/exper.png'
// @ts-ignore
import chat from '@assets/icons/chat.png'
// @ts-ignore
import chatbot from '@assets/icons/chatbot.png'
// @ts-ignore
import product from '@assets/icons/product.png'
// @ts-ignore
import ict from '@assets/images/logo_ict.jpg'
import { StatusBar } from 'expo-status-bar'
import { screenWidth } from '@utils/window'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import Constants from '@constants/Constants'
import LienKetDoanhNghiep from '@components/Home/LienKetDoanhNghiep'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import { ReactNode, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { usePushNotifications } from '@hooks/usePushNotifications'
import { saveDeviceToken } from '@services/accountServices'
import ThongBaoIcon from '@components/Home/ThongBaoIcon'
import TopSumary from '@components/Home/TopSumary'
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export default function TrangTin() {
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)
    const { registerForPushNotificationsAsync } = usePushNotifications()
    useEffect(() => {
        ;(async () => {
            if (isLoggedIn) {
                const token = await registerForPushNotificationsAsync()
                if (token && token.data) {
                    await saveDeviceToken(token.data)
                }
            }
        })()
    }, [isLoggedIn])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <LinearGradient colors={['#32acff', '#94d3fe']} style={styles.container}>
                    {/* Top header */}
                    <SafeAreaView style={styles.topContainer}>
                        {isLoggedIn && userProfile && (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                    <Image
                                        style={styles.avatar}
                                        defaultSource={no_avatar}
                                        source={userProfile?.image ? { uri: userProfile?.image } : no_avatar}
                                    />
                                    <View>
                                        <Text style={{ color: 'white' }}>Xin chào</Text>
                                        <Text style={styles.topText}>{userProfile?.name}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                        {!isLoggedIn && (
                            <Pressable onPress={() => router.push('/auth/login')}>
                                <Text style={[styles.topText, {}]}>Đăng nhập</Text>
                            </Pressable>
                        )}
                        <ThongBaoIcon />
                    </SafeAreaView>
                    {/* End top header */}
                    <TopSumary />
                </LinearGradient>
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Dịch vụ tư vấn</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 25, paddingVertical: 12 }}>
                            <HomeButtonIcon
                                text='Nhu cầu'
                                imageSource={nhucau}
                                onPress={() => router.push('/news')}
                                backgroundColor={['#2eb4fe', '#20a0f9']}
                            />
                            <HomeButtonIcon
                                text='Chuyên gia'
                                imageSource={chuyengia}
                                onPress={() => router.push('/chuyengia')}
                                backgroundColor={['#3078ff', '#4385f6']}
                            />
                            <HomeButtonIcon
                                text='Hỏi đáp'
                                imageSource={hoidap}
                                onPress={() => router.push('/chuyengia/hoidap')}
                                backgroundColor={['#03bf5e', '#00b157']}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Tin tức - Kiến thức</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 16, paddingVertical: 12 }}>
                            <HomeCard
                                text='Tin tức'
                                imageSource={tintuc}
                                onPress={() => router.push('/news')}
                                backgroundColor={['#3078ff', '#4385f6']}
                            />
                            <HomeCard
                                text='Video'
                                imageSource={video}
                                onPress={() => router.push('/news/video')}
                                backgroundColor={['#2eb4fe', '#20a0f9']}
                            />
                            <HomeCard
                                text='Văn bản'
                                imageSource={document}
                                onPress={() => router.push('/thuvien')}
                                backgroundColor={['#03bf5e', '#00b157']}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Khám phá</Text>
                        <View style={{ gap: 16, paddingVertical: 12 }}>
                            <View style={exploreStyles.row}>
                                <ExploreCard
                                    icon={<Ionicons name='chatbox-outline' size={24} color={Colors.default} />}
                                    text='Chat bot tư vấn'
                                    onPress={() => router.push('/web/chatbot')}
                                />
                                <ExploreCard
                                    icon={<Ionicons name='fast-food-outline' size={24} color={Colors.default} />}
                                    text='Đặc sản An Giang'
                                    onPress={() => router.push('/web/dacsan')}
                                />
                            </View>
                            <View style={exploreStyles.row}>
                                <ExploreCard
                                    icon={
                                        <MaterialCommunityIcons
                                            name='format-list-bulleted-square'
                                            size={24}
                                            color={Colors.default}
                                        />
                                    }
                                    text='Khảo sát trực tuyến'
                                    onPress={() => router.push('/web/khaosat')}
                                />
                                <ExploreCard
                                    icon={<AntDesign name='customerservice' size={24} color={Colors.default} />}
                                    text='Trung tâm tin học DHAG'
                                    onPress={() => router.push('/trungtam')}
                                />
                            </View>
                        </View>
                    </View>

                    {/* LIÊN KẾT DOANH NGHIỆP */}
                    <View style={[styles.contentContainer]}>
                        <Text style={[textStyles.title, styles.title]}>Liên kết doanh nghiệp</Text>
                        <LienKetDoanhNghiep />
                    </View>
                </View>
            </ScrollView>
            <StatusBar style='light' backgroundColor='#365ef6' />
        </View>
    )
}

interface HomeButtonIconProps {
    imageSource: any
    text: string
    backgroundColor: string[]
    onPress: () => void
}

interface HomeCardProps {
    imageSource: any
    text: string
    backgroundColor: string[]
    onPress: () => void
}

interface ExploreCardProps {
    icon: ReactNode
    text: string
    onPress: () => void
}

const HomeButtonIcon = (props: HomeButtonIconProps) => {
    const { imageSource, onPress, text, backgroundColor } = props
    return (
        <Pressable onPress={onPress} style={itemStyles.container}>
            <LinearGradient colors={backgroundColor} style={itemStyles.iconContainer}>
                <Image source={imageSource} style={itemStyles.icon} />
            </LinearGradient>
            <Text style={itemStyles.text}>{text}</Text>
        </Pressable>
    )
}

const HomeCard = (props: HomeCardProps) => {
    const { imageSource, onPress, text, backgroundColor } = props
    return (
        <Pressable onPress={onPress} style={cardStyles.container}>
            <LinearGradient colors={backgroundColor} style={cardStyles.iconContainer}>
                <Text numberOfLines={2} style={cardStyles.text}>
                    {text}
                </Text>
                <Image source={imageSource} style={cardStyles.icon} />
            </LinearGradient>
        </Pressable>
    )
}

const ExploreCard = (props: ExploreCardProps) => {
    const { icon, onPress, text } = props
    return (
        <Pressable onPress={onPress} style={exploreStyles.container}>
            {icon}
            <Text numberOfLines={2} style={exploreStyles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        backgroundColor: 'white',
        paddingVertical: 24,
        // paddingHorizontal: 8,
    },
    title: {
        color: '#35404b',
        fontWeight: 'bold',
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        // backgroundColor: '#8c26f97a',
    },
    avatar: {
        width: 45,
        height: 45,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
    },
    topText: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: '500',
    },
    contentContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    btnContainer: {
        // flex: 1,
        width: screenWidth / 2 - 24,
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

const itemStyles = StyleSheet.create({
    container: {
        flexShrink: 0,
        alignItems: 'center',
        gap: 4,
        overflow: 'hidden',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 14,
        flexShrink: 0,
        textAlign: 'center',
        color: '#393f46',
    },
})

const cardStyles = StyleSheet.create({
    container: {
        width: 130,
        borderRadius: 16,
        overflow: 'hidden',
    },
    iconContainer: {
        justifyContent: 'space-between',
    },
    icon: {
        width: '80%',
        height: 130,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
})

const exploreStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 16,
        flexShrink: 1,
    },
})
