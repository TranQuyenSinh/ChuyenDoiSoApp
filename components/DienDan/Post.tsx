import { Alert, Image, Pressable, StyleSheet, Text, View, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { AnhBaiViet, BaiViet } from '@constants/DienDan/DienDanTypes'
import { useRouter } from 'expo-router'
import { postLikeBaiViet } from '@services/dienDanServices'
import Colors from '@constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
interface PostProps {
    data: BaiViet
}

const Post = ({ data }: PostProps) => {
    const router = useRouter()
    const [isLike, setIsLike] = useState(false)
    const [totalLike, setTotalLike] = useState(0)
    const { isLoggedIn } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (data) {
            console.log('===> ', data)
            setIsLike(data.isLike)
            setTotalLike(data.luotThich)
        }
    }, [data])

    const handleLike = async () => {
        if (!isLoggedIn) {
            Alert.alert(
                'Lưu ý',
                'Hãy đăng nhập hoặc tạo tài khoản',
                [{ text: 'Đồng ý', onPress: () => router.push('/auth/login') }],
                {
                    cancelable: true,
                }
            )
            return
        }
        const response = await postLikeBaiViet(data.id)
        setIsLike(response.isLike)
        setTotalLike(response.totalLike)
    }

    const handleShare = async () => {
        await Share.share({
            title: 'Chỉa sẻ bài viết',
            message: `${process.env.EXPO_PUBLIC_MAIN_HOST}/baiviet/${data.id}`,
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.postTop}>
                <View style={styles.infoContainer}>
                    <Pressable onPress={() => router.push(`/doanhnghiep/${data.doanhNghiep?.id}`)}>
                        <Image style={styles.userAvatar} source={{ uri: data.user.image }} />
                    </Pressable>
                    <View style={styles.info}>
                        <Pressable onPress={() => router.push(`/doanhnghiep/${data.doanhNghiep?.id}`)}>
                            <Text style={styles.userName}>{data.user.name}</Text>
                        </Pressable>
                        <View style={styles.timeContainer}>
                            <Ionicons name='time-outline' size={10} color={'orange'} />
                            <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
                        </View>
                        <Text style={styles.view}>{data.luotXem} lượt xem</Text>
                    </View>
                </View>

                <Text style={styles.content} numberOfLines={7}>
                    {data.noiDung}
                </Text>
            </View>

            <View style={styles.postCenter}>
                {data.hinhAnhs?.map((image: AnhBaiViet) => {
                    return (
                        <View
                            key={image.id}
                            style={[
                                styles.postImageContainer,
                                {
                                    width:
                                        (data.hinhAnhs?.length || 0) > 2
                                            ? '33.33333%'
                                            : data.hinhAnhs?.length === 2
                                            ? '50%'
                                            : '100%',
                                },
                            ]}>
                            <Image style={styles.postImage} source={{ uri: image.hinhAnh }} />
                        </View>
                    )
                })}
            </View>
            <View style={styles.postBottom}>
                <Pressable onPress={handleLike} android_ripple={{ color: 'grey' }} style={styles.actionButton}>
                    <AntDesign name='like1' size={16} color={isLike ? Colors.default : 'grey'} />
                    <Text style={[styles.actionText, isLike && { color: Colors.default }]}>
                        Thích {totalLike !== 0 ? totalLike : ''}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        if (isLoggedIn) router.push(`/social/baiviet/${data.id}`)
                        else
                            Alert.alert(
                                'Lưu ý',
                                'Hãy đăng nhập hoặc tạo tài khoản',
                                [{ text: 'Đồng ý', onPress: () => router.push('/auth/login') }],
                                {
                                    cancelable: true,
                                }
                            )
                    }}
                    android_ripple={{ color: 'grey' }}
                    style={styles.actionButton}>
                    <FontAwesome name='comment' size={16} color={'grey'} />
                    <Text style={styles.actionText}>
                        Bình luận
                        {/* {data.luotBinhLuan !== 0 ? data.luotBinhLuan : ''} */}
                    </Text>
                </Pressable>
                <Pressable onPress={handleShare} android_ripple={{ color: 'grey' }} style={styles.actionButton}>
                    <FontAwesome name='share' size={16} color={'grey'} />
                    <Text style={styles.actionText}>Chia sẻ</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 2,
        marginBottom: 12,
        borderRadius: 2,
        overflow: 'hidden',
        paddingHorizontal: 10,
    },
    postTop: {
        padding: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    info: {
        gap: 3,
    },
    userName: {
        fontWeight: '500',
    },
    timeContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    time: {
        color: 'grey',
        fontSize: 10,
    },
    view: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey',
    },
    content: {
        marginVertical: 12,
        fontSize: 16,
        lineHeight: 20,
    },
    postCenter: {
        flexDirection: 'row',
        // gap: 2,
        flexWrap: 'wrap',
    },
    postImageContainer: {
        padding: 1,
        columnGap: 1,
    },
    postImage: {
        alignSelf: 'center',
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    postBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
    },
})
