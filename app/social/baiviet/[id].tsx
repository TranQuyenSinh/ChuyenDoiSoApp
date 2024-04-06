import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { BaiViet, BinhLuanBaiViet, DanhMucBaiViet } from '@constants/DienDan/DienDanTypes';
import Post from '@components/DienDan/Post';
import { Ionicons } from '@expo/vector-icons';
import PostComment from '@components/DienDan/PostComment';
import { Use } from 'react-native-svg';
import { User } from '@constants/CommonTypes/UserType';

const PostDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const categoryTag: DanhMucBaiViet = {
        id: 1,
        name: 'Cà phê',
    }
    const user: User = {
        id: 1,
        email: 'sinh@gmail.com',
        name: 'Nguyễn Hữu Lễ',
        image: 'https://file3.qdnd.vn/data/images/0/2024/02/25/upload_2080/gia%20lua%20gao%20hom%20nay%2025-2.jpg?dpi=150&quality=100&w=870'
    }

    const post: BaiViet = {
        id: 1,
        luotThich: 43,
        noiDung: 'NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng',
        luotXem: 337,
        user: user,
        hinhAnhs: ['https://image.nhandan.vn/w800/Files/Images/2021/05/19/a1-1621390710942.JPG.webp'],
        createdAt: new Date(2024, 3, 3).toISOString(),
        danhMucs: [
            categoryTag
        ]
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Bình luận',
            headerTitleAlign: 'center',
        })
    }, [navigation])

    const commentData: BinhLuanBaiViet = {
        id: 1, createdAt: new Date().toISOString(),
        noiDung: 'Mê quá',
        user: user
    }
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={false}
                onRefresh={() => { }}
            />
        } showsVerticalScrollIndicator={false} style={styles.container}>
            <Post data={post} />
            <View style={styles.sortContainer}>
                <View style={styles.sortButton}>
                    <Text style={styles.sortText}>Mới nhất</Text>
                    <Ionicons name='chevron-down' size={16} color={'grey'} />
                </View>
            </View>
            <PostComment data={commentData} />
        </ScrollView>
    );
};

export default PostDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    sortButton: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    sortText: {
        fontSize: 16
    },
});
