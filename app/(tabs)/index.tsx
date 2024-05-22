import { router } from 'expo-router'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image, Pressable, StyleSheet, ScrollView, Linking } from 'react-native'

import Colors from '@constants/Colors'
import { RootState, useAppDispatch } from '@redux/store'
import { textStyles } from '@constants/Styles'

//@ts-ignore
import tintuc from '@assets/icons/home/tintuc.png'
//@ts-ignore
import video from '@assets/icons/home/video.png'
//@ts-ignore
import document from '@assets/icons/home/document.png'
//@ts-ignore
import hoidap from '@assets/icons/home/hoidap.png'
//@ts-ignore
import documentcds from '@assets/icons/home/documentcds.png'
//@ts-ignore
import timkiem from '@assets/icons/home/timkiem.png'

//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'

// @ts-ignore
import { StatusBar } from 'expo-status-bar'
import { screenWidth } from '@utils/window'
import LienKetDoanhNghiep from '@components/Home/LienKetDoanhNghiep'
import { ReactNode, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { usePushNotifications } from '@hooks/usePushNotifications'
import { saveDeviceToken } from '@services/accountServices'
import ThongBaoIcon from '@components/Home/ThongBaoIcon'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { getChuyenGias } from '@services/chuyenGiaServices'
import Button from '@components/View/Button'
import { ROLES } from '@constants/Constants'
import { Text } from '@components/View/Text'
import { useDangNhap } from '@hooks/useDangNhap'
import RowComponent from '@components/View/RowComponent'
import LinkWebsite from '@components/Home/LinkWebsite'
import { appIcons } from '@constants/Images'
import PremiumLabel from '@components/View/PremiumLabel'
import LienKetSanPham from '@components/Home/LienKetSanPham'
import LinkComponent from '@components/View/LinkComponent'

export default function TrangTin() {
    const { isLoggedIn, userProfile } = useSelector((state: RootState) => state.user)
    const { doanhNghiep } = useSelector((state: RootState) => state.doanhNghiep)
    const { registerForPushNotificationsAsync } = usePushNotifications()
    const [chuyenGias, setChuyenGias] = useState<ChuyenGia[] | undefined>([])
    const { isInRole } = useDangNhap()

    useEffect(() => {
        ;(async () => {
            var linhVucId = doanhNghiep?.linhVuc?.id
            const data = await getChuyenGias(linhVucId)
            setChuyenGias(data?.filter(x => x.user?.id !== userProfile?.id))
        })()
    }, [doanhNghiep?.linhVuc?.id, userProfile?.id])

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
                                    <Pressable onPress={() => router.push('/(tabs)/profile')}>
                                        <Image
                                            style={styles.avatar}
                                            defaultSource={no_avatar}
                                            source={userProfile?.image ? { uri: userProfile?.image } : no_avatar}
                                        />
                                    </Pressable>
                                    <View>
                                        {/* <Text style={{ color: 'white' }}>Xin chào</Text> */}
                                        <Text style={styles.topText}>{userProfile?.name}</Text>
                                        {!!doanhNghiep?.hoiVien && <PremiumLabel style={{ marginTop: 4 }} />}
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
                    {/* <TopSumary /> */}
                </LinearGradient>
                <View style={styles.body}>
                    {isInRole(ROLES.DOANH_NGHIEP) && (
                        <View style={styles.contentContainer}>
                            <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Dịch vụ tư vấn</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 25, paddingVertical: 12, flex: 1 }}>
                                {/* <HomeButtonIcon
                                    text='Nhu cầu phần mềm'
                                    imageSource={nhucau}
                                    onPress={() => router.push('/nhucau/phanmem')}
                                    backgroundColor={['#2eb4fe', '#20a0f9']}
                                /> */}
                                <HomeButtonIcon
                                    text='Chuyên gia đang tư vấn'
                                    imageSource={hoidap}
                                    onPress={() => router.push('/chat')}
                                    backgroundColor={['#03bf5e', '#00b157']}
                                />
                            </ScrollView>
                        </View>
                    )}
                    {isInRole(ROLES.CHUYEN_GIA) && (
                        <View style={styles.contentContainer}>
                            <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Dành cho chuyên gia</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 25, paddingVertical: 12, flex: 1 }}>
                                <HomeButtonIcon
                                    text='Tìm kiếm doanh nghiệp'
                                    imageSource={timkiem}
                                    onPress={() => router.push('/tuvan/timkiem')}
                                    backgroundColor={['#2eb4fe', '#20a0f9']}
                                />
                                <HomeButtonIcon
                                    text='Doanh nghiệp đang tư vấn'
                                    imageSource={hoidap}
                                    onPress={() => router.push('/chat')}
                                    backgroundColor={['#03bf5e', '#00b157']}
                                />
                            </ScrollView>
                        </View>
                    )}

                    {isInRole(ROLES.ADMIN) && (
                        <View style={styles.contentContainer}>
                            <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>
                                Dành cho Quản trị viên
                            </Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 25, paddingVertical: 12, flex: 1 }}>
                                <HomeButtonIcon
                                    text='Tạo thông báo'
                                    imageSource={appIcons.notification}
                                    onPress={() => router.push('/thongbao/create')}
                                    backgroundColor={['#2eb4fe', '#20a0f9']}
                                />
                                <HomeButtonIcon
                                    text='Thống kê doanh nghiệp'
                                    imageSource={appIcons.thongKe}
                                    onPress={() => router.push('/thongke')}
                                    backgroundColor={['#03bf5e', '#00b157']}
                                />
                            </ScrollView>
                        </View>
                    )}

                    {!isLoggedIn && (
                        <View style={styles.contentContainer}>
                            <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Dịch vụ tư vấn</Text>
                            <Button
                                btnStyles={{ borderRadius: 30, maxWidth: '70%', alignSelf: 'center' }}
                                text='Đăng nhập để khám phá'
                                onPress={() => router.push('/auth/login')}
                            />
                        </View>
                    )}

                    <View style={styles.contentContainer}>
                        <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>Thông tin chuyển đổi số</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                gap: 16,
                                paddingVertical: 12,
                                flexGrow: 1,
                                alignItems: 'stretch',
                            }}>
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
                                text='Tài liệu Chuyển đổi số'
                                imageSource={documentcds}
                                onPress={() => router.push('/thuvien/chuyendoiso')}
                                backgroundColor={['#03bf5e', '#00b157']}
                            />
                            <HomeCard
                                text='Văn bản'
                                imageSource={document}
                                onPress={() => router.push('/thuvien')}
                                backgroundColor={['#fe9961', '#fc8744']}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[textStyles.title, styles.title, { marginTop: 0 }]}>
                            Chuyên gia tư vấn{' '}
                            {doanhNghiep?.linhVuc?.tenLinhVuc && `${doanhNghiep?.linhVuc?.tenLinhVuc}`}
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 16, paddingVertical: 12 }}>
                            {chuyenGias?.length !== 0 &&
                                chuyenGias?.map(item => <ChuyenGiaCard key={item.id} chuyenGia={item} />)}
                        </ScrollView>
                        <Pressable onPress={() => router.push('/chuyengia')}>
                            <Text color={Colors.default} align='right'>
                                Xem tất cả Chuyên gia {`>>`}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Liên kết sản phẩm doanh nghiệp */}
                    <View style={[styles.contentContainer]}>
                        <Text style={[textStyles.title, styles.title]}>Sản phẩm doanh nghiệp</Text>
                        <LienKetSanPham />
                        <RowComponent justify='flex-end'>
                            <LinkComponent text='Xem tất cả sản phẩm >>' onPress={() => router.push('/sanpham')} />
                        </RowComponent>
                    </View>

                    {/* LIÊN KẾT DOANH NGHIỆP */}
                    <View style={[styles.contentContainer]}>
                        <Text style={[textStyles.title, styles.title]}>Liên kết doanh nghiệp</Text>
                        <LienKetDoanhNghiep />
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
                                    text='Cổng thông tin'
                                    onPress={() => router.push('/web/thongtin')}
                                />
                            </View>
                        </View>
                    </View>

                    {/* LIÊN KẾT khác */}
                    <View style={[styles.contentContainer]}>
                        <Text style={[textStyles.title, styles.title]}>Các kênh Chuyển đổi số An Giang</Text>
                        <RowComponent gap={12} justify='space-between'>
                            <LinkWebsite
                                onPress={() => Linking.openURL('fb://page/130858276774825')}
                                image={appIcons.facebook}
                                text='Facebook'
                                backgroundColor='#1877f2'
                            />
                            <LinkWebsite
                                image={appIcons.youtube}
                                text='Youtube'
                                onPress={() => Linking.openURL('https://www.youtube.com/@chuyendoisodnnvv')}
                                backgroundColor='#ff0000'
                            />
                        </RowComponent>
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

interface ChuyenGiaCardProps {
    chuyenGia: ChuyenGia
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

const ChuyenGiaCard = (props: ChuyenGiaCardProps) => {
    const { chuyenGia } = props
    const dispatch = useAppDispatch()
    return (
        <View style={chuyenGiaStyles.container}>
            <Pressable onPress={() => router.push(`/chuyengia/${chuyenGia.id}`)} style={chuyenGiaStyles.top}>
                <Image
                    style={chuyenGiaStyles.image}
                    source={chuyenGia?.hinhAnh ? { uri: chuyenGia.hinhAnh } : no_avatar}
                />
                <View style={chuyenGiaStyles.info}>
                    <Text style={chuyenGiaStyles.name}>
                        {chuyenGia.trinhDo}
                        {chuyenGia.trinhDo && ' '}
                        {chuyenGia.tenChuyenGia}
                    </Text>
                    {chuyenGia.chucVu && <Text style={chuyenGiaStyles.text}>{chuyenGia.chucVu}</Text>}
                    <View style={{ flex: 1 }} />
                    {chuyenGia.namKinhNghiem && (
                        <Text style={chuyenGiaStyles.text}>Kinh nghiệm: {chuyenGia.namKinhNghiem}</Text>
                    )}
                    <Text style={chuyenGiaStyles.text}>Lĩnh vực tư vấn: {chuyenGia.linhVuc.tenLinhVuc}</Text>
                </View>
            </Pressable>
            <View style={chuyenGiaStyles.bottom}>
                <Button
                    btnStyles={[chuyenGiaStyles.button, { backgroundColor: Colors.success }]}
                    text='Gọi điện'
                    onPress={() => Linking.openURL(`tel:${chuyenGia.sdt}`)}
                />
                <Button
                    btnStyles={[chuyenGiaStyles.button, { backgroundColor: Colors.orange }]}
                    text='Trao đổi'
                    // onPress={() => router.push(`/tuvan/${chuyenGia.user.id}`)}
                    onPress={() => {
                        // dispatch(chatActions.setUser(chuyenGia.user))
                        router.push(`/chat/${chuyenGia.user.id}`)
                    }}
                />
            </View>
        </View>
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
        width: 50,
        height: 50,
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
        maxWidth: 100,
    },
})

const cardStyles = StyleSheet.create({
    container: {
        width: 150,
        borderRadius: 16,
        overflow: 'hidden',
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'space-between',
        flex: 1,
    },
    icon: {
        width: '80%',
        height: 120,
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

const chuyenGiaStyles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#e8f4ff',
        borderRadius: 16,
    },
    top: {
        flexDirection: 'row',
        gap: 12,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        gap: 2,
    },
    name: {
        fontWeight: '600',
        color: '#38383a',
        fontSize: 15,
    },
    text: {
        color: '#595959',
        fontSize: 12,
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 6``,
        gap: 16,
        marginTop: 8,
    },
    button: {
        flex: 1,
        height: 30,
        borderRadius: 30,
    },
})
