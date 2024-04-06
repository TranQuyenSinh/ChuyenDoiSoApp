import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { BaiViet } from '@constants/DienDan/DienDanTypes';
import { useRouter } from 'expo-router';

interface PostProps {
    data: BaiViet
}

const Post = ({ data }: PostProps) => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.postTop}>
                <View style={styles.infoContainer}>
                    <Image style={styles.userAvatar} source={{ uri: data.user.image }} />
                    <View style={styles.info}>
                        <Text style={styles.userName}>{data.user.name}</Text>
                        <View style={styles.timeContainer}>
                            <Ionicons name='time-outline' size={10} color={'orange'} />
                            <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
                        </View>
                        <Text style={styles.view}>{data.luotXem} lượt xem</Text>
                    </View>
                </View>

                <Text style={styles.content} numberOfLines={7} >
                    {data.noiDung}
                </Text>
            </View>

            <View style={styles.postCenter}>
                <Image style={styles.postImage} source={{ uri: data.hinhAnhs?.[0] }} />
            </View>
            <View style={styles.postBottom}>
                <Pressable android_ripple={{ color: "grey" }} style={styles.actionButton}>
                    <AntDesign name='like1' size={16} color={'grey'} />
                    <Text style={styles.actionText}>Thích{' '}
                        {data.luotThich !== 0 ? data.luotThich : ''}
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push(`/social/baiviet/${data.id}`)} android_ripple={{ color: "grey" }} style={styles.actionButton}>
                    <FontAwesome name='comment' size={16} color={'grey'} />
                    <Text style={styles.actionText}>Bình luận
                        {/* {data.luotBinhLuan !== 0 ? data.luotBinhLuan : ''} */}
                    </Text>
                </Pressable>
                <Pressable android_ripple={{ color: "grey" }} style={styles.actionButton}>
                    <FontAwesome name='share' size={16} color={'grey'} />
                    <Text style={styles.actionText}>Chia sẻ</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 2,
        marginBottom: 12,
        elevation: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    postTop: {

        padding: 12
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
        fontSize: 10
    },
    view: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey'
    },
    content: {
        marginVertical: 12,
        fontSize: 16,
        lineHeight: 20
    },
    postCenter: {},
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    postBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
});
