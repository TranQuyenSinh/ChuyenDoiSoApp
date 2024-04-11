import { FlatList, RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Colors from '@constants/Colors'
import TopSearch from '@components/DienDan/TopSearch'
import CategoryTag from '@components/DienDan/CategoryTag'
import { BaiViet, DanhMucBaiViet } from '@constants/DienDan/DienDanTypes'
import Post from '@components/DienDan/Post'
import { router, useNavigation } from 'expo-router'
import { getBaiViets, getDanhMucs } from '@services/dienDanServices'
import CreatePostButton from '@components/DienDan/CreatePostButton'

const SocialPage = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState<DanhMucBaiViet[]>([])
    const [posts, setPosts] = useState<BaiViet[]>([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const tags = await getDanhMucs()
        const posts = await getBaiViets()
        setTags(tags)
        console.log('===> ', tags)
        setPosts(posts)
        console.log('===> ', posts)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <TopSearch value={search} onChangeText={text => setSearch(text)} />
            <ScrollView
                horizontal
                style={{ flexShrink: 0 }}
                contentContainerStyle={styles.tagsContainer}
                showsHorizontalScrollIndicator={false}>
                {tags.map(item => (
                    <CategoryTag key={item.id} data={item} onPress={item => router.push(`/social/tag/${item.id}`)} />
                ))}
            </ScrollView>
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}>
                {posts.map(item => (
                    <Post key={item.id} data={item} />
                ))}
            </ScrollView>
            <StatusBar barStyle={'light-content'} />
        </View>
    )
}

export default SocialPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    tagsContainer: {
        gap: 6,
        paddingHorizontal: 6,
        marginVertical: 6,
    },
})
