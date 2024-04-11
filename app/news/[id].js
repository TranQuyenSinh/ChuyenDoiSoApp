import React, { useState, useEffect, useLayoutEffect, Share } from 'react'

import { useDispatch } from 'react-redux'
import RenderHTML from 'react-native-render-html'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { Text, View, Pressable, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import tinTucSlice from '@redux/tinTucSlice'
import { Ionicons } from '@expo/vector-icons'
import { tagStyles } from '@configs/newsHtmlConfig'
import Loading from '@components/StatusPage/Loading'
import NotFound from '@components/StatusPage/NotFound'
import { getTinTucById } from '@services/tinTucServices'
import TinXemNhieu from '@components/TinTuc/TinXemNhieu'
import TinLienQuan from '@components/TinTuc/TinLienQuan'
import { textStyles, defaultStyles } from '@constants/Styles'
import BinhLuanBottomSheet from '@components/TinTuc/BinhLuanBottomSheet'
import no_image from '@assets/images/logo_an_giang.jpg'

const IMAGE_HEIGHT = 300
const { width, height } = Dimensions.get('window')

const DetailNews = () => {
    const { id } = useLocalSearchParams()
    const [news, setNews] = useState()
    const [status, setStatus] = useState('loading')
    const [isOpenComment, setIsOpenComment] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const scrollRef = useAnimatedRef()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, IMAGE_HEIGHT],
                        [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT], [2, 1.2, 1]),
                },
            ],
        }
    })
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
        }
    }, [])
    const handleSharing = async () => {
        await Share.share({
            title: 'Chỉa sẻ tin tức',
            message: `${process.env.EXPO_PUBLIC_MAIN_HOST}/tin/${id}`,
        })
    }

    useEffect(() => {
        ;(async () => {
            try {
                setStatus('loading')
                let news = await getTinTucById(id)
                setNews(news)
                setStatus('success')
                dispatch(tinTucSlice.actions.setTinTuc({ tinTucId: id }))
            } catch (err) {
                setStatus('error')
            }
        })()
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
            headerBackground: () => <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>,
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton} onPress={handleSharing}>
                        <Ionicons name='share-social-outline' size={22} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name='ellipsis-vertical-sharp' size={22} color={'#000'} />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color={'#000'} />
                </TouchableOpacity>
            ),
        })
    }, [])

    return (
        <View style={styles.container}>
            <BinhLuanBottomSheet isOpen={isOpenComment} toggle={setIsOpenComment} tinTucId={id} />

            {/* Main content */}
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {status == 'success' && (
                    <>
                        {/* Top Image */}
                        <Animated.Image
                            source={news?.hinhAnh ? { uri: news?.hinhAnh } : no_image}
                            style={[styles.image, imageAnimatedStyle]}
                            resizeMode='cover'
                        />

                        {/* News */}
                        <View style={[defaultStyles.container, styles.newsContainer]}>
                            <Text style={styles.tieuDe}>{news?.tieuDe}</Text>
                            <View style={{ flexDirection: 'row', gap: 3, marginTop: 12 }}>
                                {news.createdAt && (
                                    <Text style={textStyles.mutedSmall}>
                                        <Ionicons name='ios-time-outline' size={16} color={Colors.bodyText} />
                                        <> </>
                                        {moment(news.createdAt).fromNow()}
                                        <> / </>
                                    </Text>
                                )}
                                <Text style={textStyles.mutedSmall}>
                                    <Ionicons name='eye-outline' size={16} color={Colors.bodyText} />
                                    <> </>
                                    {news?.luotXem}
                                </Text>
                            </View>
                            <RenderHTML
                                tagsStyles={tagStyles}
                                emSize={18}
                                contentWidth={width}
                                source={{ html: news?.tomTat ?? '' }}
                            />

                            <RenderHTML
                                tagsStyles={tagStyles}
                                emSize={18}
                                contentWidth={width}
                                source={{ html: news?.noiDung ?? '' }}
                            />

                            <Text style={[textStyles.medium, { textAlign: 'right' }]}>{news?.tacGia}</Text>

                            <Text style={styles.sectionTitle}>Xem nhiều nhất</Text>
                            <TinXemNhieu />
                            <Text style={styles.sectionTitle}>Tin liên quan</Text>
                            <TinLienQuan />
                        </View>
                    </>
                )}
                {status == 'loading' && (
                    <View style={{ height }}>
                        <Loading />
                    </View>
                )}
                {status == 'error' && (
                    <View style={{ height }}>
                        <NotFound message='Không tìm thấy tin' />
                    </View>
                )}
            </Animated.ScrollView>
            {/* Footer */}
            {status == 'success' && (
                <View style={[defaultStyles.footer, styles.footer]}>
                    <Pressable
                        onPress={() => navigation.dispatch({ type: 'POP_TO_TOP' })}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name='home-outline' size={24} color={Colors.bodyText} />
                        <Text style={textStyles.medium}>Trang chủ</Text>
                    </Pressable>
                    <Pressable onPress={() => setIsOpenComment(true)}>
                        <Ionicons name='chatbubble-ellipses-outline' size={24} color={Colors.bodyText} />
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default DetailNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 12,
        textTransform: 'uppercase',
        color: Colors.warning,
    },
    tieuDe: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    noiDung: {
        fontSize: 22,
        lineHeight: 36,
        marginVertical: 12,
    },
    newsContainer: {
        paddingTop: 16,
        backgroundColor: Colors.background.default,
    },
    image: {
        height: IMAGE_HEIGHT,
        width: width,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    header: {
        backgroundColor: '#fff',
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
