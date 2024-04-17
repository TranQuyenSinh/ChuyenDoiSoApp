import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghiep } from '@services/doanhNghiepServices'
import NotFound from '@components/StatusPage/NotFound'
import Post from '@components/DienDan/Post'
import { BaiViet } from '@constants/DienDan/DienDanTypes'
import { getBaiVietsByDoanhNghiep } from '@services/dienDanServices'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated'
import { getSanPhamByDoanhNghiep } from '@services/sanPhamServices'
import SanPhamComponent, { ITEM_WIDTH } from '@components/SanPham/SanPham'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'

const ITEM_GAP = 12

const DoanhNghiepDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [data, setData] = useState<DoanhNghiep | undefined>()
    const [products, setProducts] = useState<SanPham[]>([])

    const [posts, setPosts] = useState<BaiViet[]>([])
    const [loading, setLoading] = useState(false)
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const scrollY = useSharedValue<number>(0)
    const scrollViewRef = useRef<Animated.ScrollView>(null)
    const scrollTopButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollY.value, [300, 500], [0, 1]),
        }
    }, [])

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        },
    })

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
    }

    const fetchData = async (id: number) => {
        setLoading(true)
        const data = await getDoanhNghiep(id)
        setData(data)
        const posts = await getBaiVietsByDoanhNghiep(id)
        setPosts(posts)
        const products = await getSanPhamByDoanhNghiep(id)
        setProducts(products)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(+id)
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <NotFound message='Có lỗi xảy ra, vui lòng thử lại!' />
    }

    return (
        <View style={styles.container}>
            <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />
            <PageHeader tintColor='white' title={'Doanh nghiệp'} style={{ marginBottom: 12 }} />
            <Animated.ScrollView ref={scrollViewRef} onScroll={scrollHandler} showsVerticalScrollIndicator={false}>
                <View
                    style={[
                        styles.section,
                        { flexDirection: 'row', gap: 12, backgroundColor: '#ffffff41', padding: 12 },
                    ]}>
                    <Image source={data.user?.image ? { uri: data.user?.image } : no_avatar} style={styles.image} />
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.ten}>{data?.tenTiengViet}</Text>
                            <Text style={styles.text}>Địa chỉ: {data.diaChi}</Text>
                            <Text style={styles.text}>
                                Điện thoại: {data.sdts?.[0]?.sdt} {data.sdts?.[1]?.sdt}
                            </Text>
                            <Text style={styles.text}>Email: {data.user?.email}</Text>
                            {data.website && <Text style={styles.text}>Website: {data.website}</Text>}
                        </View>
                    </View>
                </View>

                <View style={[styles.section]}>
                    <Text style={[styles.title]}>Sản phẩm nổi bật</Text>
                    <ScrollView
                        horizontal
                        disableIntervalMomentum={true}
                        snapToInterval={ITEM_WIDTH + ITEM_GAP}
                        contentContainerStyle={{ gap: ITEM_GAP }}
                        showsHorizontalScrollIndicator={false}>
                        {products?.length === 0 && <Text style={styles.text}>Chưa cập nhật</Text>}
                        {products.map(item => (
                            <SanPhamComponent data={item} key={item.id} />
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Bài viết trên diễn đàn</Text>
                    {posts?.length === 0 && (
                        <Text style={{ fontSize: 12, color: 'white' }}>Doanh nghiệp chưa có bài viết nào</Text>
                    )}
                    {posts.map(item => (
                        <Post data={item} key={item.id} />
                    ))}
                </View>
            </Animated.ScrollView>
            <AnimatedPressable onPress={scrollToTop} style={[styles.scrollToTopButton, scrollTopButtonStyle]}>
                <Ionicons name='arrow-up' size={24} color={'white'} />
            </AnimatedPressable>
        </View>
    )
}

export default DoanhNghiepDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2f4ff',
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    section: {
        borderRadius: 12,
        marginBottom: 12,
        marginHorizontal: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    infoContainer: {
        gap: 4,
    },
    ten: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '500',
        color: 'white',
    },
    text: {
        fontSize: 12,
        color: 'white',
    },
    title: {
        marginBottom: 12,
        marginTop: 6,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '500',
        color: 'white',
    },
    infoItem: {
        marginBottom: 12,
    },
    scrollToTopButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        borderRadius: 50,
        backgroundColor: '#00000092',
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        height: 50,
        width: 50,
        zIndex: 999,
    },
})
