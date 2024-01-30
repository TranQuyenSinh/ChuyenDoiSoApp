import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

import { useRouter } from 'expo-router'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router, useNavigation, useLocalSearchParams } from 'expo-router'
import { Text, View, Pressable, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Animated, {
    SlideInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { getTinTucById } from '@services/tinTucServices'
import { textStyles, defaultStyles } from '@constants/Styles'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BinhLuanBottomSheet from '@components/TinTuc/BinhLuanBottomSheet'
import { useDispatch, useSelector } from 'react-redux'
import tinTucSlice from '@redux/tinTucSlice'
import Loading from '@components/StatusPage/Loading'
import NotFound from '@components/StatusPage/NotFound'

const IMAGE_HEIGHT = 300
const { width, height } = Dimensions.get('window')

const DetailNews = () => {
    const { id } = useLocalSearchParams()
    const [news, setNews] = useState()
    const [status, setStatus] = useState('loading')

    const navigation = useNavigation()
    const dispatch = useDispatch()

    // ===========

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
        try {
            await Share.share({
                title: '123',
                url: '123312321',
            })
        } catch (err) {
            console.log(err)
        }
    }
    // ===========

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

    const [isOpenComment, setIsOpenComment] = useState(false)

    return (
        <View style={styles.container}>
            <BinhLuanBottomSheet isOpen={isOpenComment} toggle={setIsOpenComment} tinTucId={id} />
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {status == 'success' && (
                    <>
                        <Animated.Image
                            source={{ uri: news?.hinhAnh }}
                            style={[styles.image, imageAnimatedStyle]}
                            resizeMode='cover'
                        />
                        <View style={[defaultStyles.container, styles.newsContainer]}>
                            <Text style={styles.tieuDe}>{news?.tieuDe}</Text>
                            <View style={{ flexDirection: 'row', gap: 3, marginTop: 12 }}>
                                <Text style={textStyles.small}>{news?.tacGia}</Text>
                                <Ionicons name='ios-time-outline' size={16} color={Colors.bodyText} />
                                <Text style={textStyles.mutedSmall}>{moment(news?.createdAt).fromNow()}</Text>
                            </View>

                            <Text style={styles.noiDung}>{news?.noiDung}</Text>
                            <Text>Tin khác</Text>
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
        backgroundColor: Colors.lightGrey,
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