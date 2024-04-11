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
// @ts-ignore
import news from '@assets/icons/news.png'
// @ts-ignore
import video from '@assets/icons/video.png'
// @ts-ignore
import document from '@assets/icons/document.png'
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
import home from '@assets/images/test2.jpeg'
// @ts-ignore
import ict from '@assets/images/logo_ict.jpg'
import { StatusBar } from 'expo-status-bar'
import { screenWidth } from '@utils/window'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import Constants from '@constants/Constants'
export default function TrangTin() {
    const router = useRouter()
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)

    return (
        <View style={styles.container}>
            <Image source={home} style={[StyleSheet.absoluteFill, styles.background]} />
            <SafeAreaView style={styles.topContainer}>
                <Image source={logo} style={styles.topImage} />
                {isLoggedIn && userProfile && <Text style={styles.topText}>Xin chào, {userProfile?.name}</Text>}
                {!isLoggedIn && (
                    <Pressable onPress={() => router.push('/auth/login')}>
                        <Text style={[styles.topText, {}]}>Đăng nhập</Text>
                    </Pressable>
                )}
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <TinTucCarousel2 />
                <View style={styles.contentContainer}>
                    <Text style={[textStyles.title, styles.title]}>Thông tin - Tin tức</Text>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12 }}>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/news')}
                                android_ripple={{ color: 'grey' }}
                                style={itemStyles.iconContainer}>
                                <Image source={news} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Tin tức</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/news/video')}
                                android_ripple={{ color: 'grey' }}
                                style={itemStyles.iconContainer}>
                                <Image source={video} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Video</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/thuvien')}
                                android_ripple={{ color: 'grey' }}
                                style={itemStyles.iconContainer}>
                                <Image source={document} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Thư viện</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[textStyles.title, styles.title]}>Đánh giá doanh nghiệp</Text>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12 }}>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/web/khaosat')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={survey} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Đánh giá</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/khaosat')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={result} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Kết quả</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/chuyengia')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={exper} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Chuyên gia</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() =>
                                    router.push(
                                        userProfile?.vaitro?.[0]?.id === Constants.Role.ChuyenGia
                                            ? '/chuyengia/inbox'
                                            : '/chuyengia/hoidap'
                                    )
                                }
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={chat} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Hỏi đáp</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[textStyles.title, styles.title]}>Các dịch vụ khác</Text>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12 }}>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/web/chatbot')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={chatbot} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Chatbot</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/web/dacsan')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={product} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Đặc sản AG</Text>
                        </View>
                        <View style={itemStyles.container}>
                            <Pressable
                                onPress={() => router.push('/trungtam')}
                                android_ripple={{ color: '#140b0b' }}
                                style={itemStyles.iconContainer}>
                                <Image source={ict} style={itemStyles.icon} />
                            </Pressable>
                            <Text style={itemStyles.text}>Trung tâm tin học</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                        style={[
                            textStyles.title,
                            styles.title,
                            { marginLeft: 16, marginTop: 0, alignSelf: 'flex-start', marginBottom: 6 },
                        ]}>
                        Điểm đánh giá doanh nghiệp của bạn
                    </Text>
                    <DiemLineChart />
                </View>

                <View>
                    <Text style={[textStyles.title, styles.title]}>Các dịch vụ khác</Text>
                    {/* <DiemLineChart /> */}
                </View>
            </ScrollView>

            <StatusBar style='light' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    title: {
        color: 'white',
        marginBottom: 0,
        marginTop: 4,
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
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexShrink: 0,
        alignItems: 'center',
        backgroundColor: '#e2c7ff68',
    },
    topImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        backgroundColor: 'white',
        borderRadius: 12,
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
        width: 80,
        gap: 4,
        padding: 6,
        overflow: 'hidden',
        borderRadius: 12,
    },
    iconContainer: {
        borderRadius: 12,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 10,
        width: 50,
        height: 50,
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
        color: 'white',
        // flex: 1,
    },
})
