import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { BaiViet } from '@constants/DienDan/DienDanTypes'
import { getBaiVietBySearch } from '@services/dienDanServices'
import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'
import NotFound from '@components/StatusPage/NotFound'
import Post from '@components/DienDan/Post'

const SearchBaiViet = () => {
    const { search } = useLocalSearchParams()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [posts, setPosts] = useState<BaiViet[]>([])
    const fetchData = async (search: string) => {
        setLoading(true)
        const data = await getBaiVietBySearch(search)
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        if (search)
            fetchData(search + "")
    }, [search])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Tìm kiếm',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    if (loading) return <Loading />

    if (posts?.length === 0) return <NotFound message='Không tìm thấy bài viết phù hợp' />

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={loading}
            onRefresh={() => fetchData(search + "")} />}>
            {posts.map(item => (
                <Post key={item.id} data={item} />
            ))}
        </ScrollView>
    )
}

export default SearchBaiViet

const styles = StyleSheet.create({})