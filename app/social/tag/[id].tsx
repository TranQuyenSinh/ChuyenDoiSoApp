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
            headerTitle: tag?.name ? '#' + tag.name : '',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
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
            <StatusBar barStyle={'light-content'} />
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
