import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Colors from '@constants/Colors'
import { BaiViet, DanhMucBaiViet } from '@constants/DienDan/DienDanTypes'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Post from '@components/DienDan/Post'
import { getBaiVietsByDanhMuc, getDanhMuc } from '@services/dienDanServices'

const PostInTag = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<BaiViet[]>([])
    const [tag, setTag] = useState<DanhMucBaiViet>()

    const categoryTag: DanhMucBaiViet = {
        id: 1,
        name: 'Cà phê',
    }

    const post: BaiViet = {
        id: 1,
        luotThich: 43,
        noiDung:
            'NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng',
        luotXem: 337,
        user: {
            id: 1,
            email: 'sinh@gmail.com',
            name: 'Nguyễn Hữu Lễ',
            image: 'https://file3.qdnd.vn/data/images/0/2024/02/25/upload_2080/gia%20lua%20gao%20hom%20nay%2025-2.jpg?dpi=150&quality=100&w=870',
        },
        hinhAnhs: [
            { id: 1, hinhAnh: 'https://image.nhandan.vn/w800/Files/Images/2021/05/19/a1-1621390710942.JPG.webp' },
        ],
        createdAt: new Date(2024, 3, 3).toISOString(),
        danhMucs: [categoryTag],
    }

    const fetchData = async () => {
        setLoading(true)
        const data = await getBaiVietsByDanhMuc(+id)
        setPosts(data)
        const tag = await getDanhMuc(+id)
        setTag(tag)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '#' + (tag?.name || ''),
            headerTitleAlign: 'center',
        })
    }, [navigation, tag])

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                refreshing={loading}
                onRefresh={fetchData}
                keyExtractor={(item, index) => index + ''}
                renderItem={({ item }) => <Post data={item} />}
            />
            <StatusBar barStyle={'dark-content'} />
        </View>
    )
}

export default PostInTag

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
})
