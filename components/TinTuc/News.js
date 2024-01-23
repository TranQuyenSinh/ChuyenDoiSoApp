import React, { useState, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { Image, Pressable, SafeAreaView, Text } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { getTinTucByLinhVuc } from '@services/tinTucServices'
import moment from '@utils/moment'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'

const ListNews = ({ linhVucId }) => {
    const router = useRouter()
    const [news, setNews] = useState([])
    const [refresing, setRefresing] = useState(false)

    const fetchData = async () => {
        if (!linhVucId) return
        setRefresing(true)
        let news = await getTinTucByLinhVuc(linhVucId)
        setNews(news)
        setRefresing(false)
    }
    useEffect(() => {
        fetchData()
    }, [linhVucId])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Carousel trong tab Home */}
            {/* {linhVucId === 'NEW' && <Carousel />} */}

            {/* Danh sách tin tức */}
            <View style={styles.container}>
                <FlatList
                    data={news}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refresing} onRefresh={fetchData} />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <News key={item.id} item={item} />
                    }}
                />
            </View>
        </View>
    )
}

export const News = ({ item }) => {
    const router = useRouter()
    return (
        <Pressable key={item.id} onPress={() => router.push(`/news/${item.id}`)} style={styles.newsContainer}>
            <Image src={item.hinhAnh} style={styles.newsImage} />
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <Text numberOfLines={3} style={styles.newsTitle}>
                    {item.tieuDe}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={textStyles.small}>{item.tacGia}</Text>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <Ionicons name='ios-time-outline' size={16} color={Colors.bodyText} />
                        <Text style={textStyles.mutedSmall}>{moment(item.createdAt).fromNow()}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    newsContainer: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
    },
    newsImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        objectFit: 'cover',
    },
    newsTitle: {
        fontSize: 17,
        width: '100%',
    },
    publishedAt: {
        color: 'grey',
        fontSize: 13,
        flexDirection: 'row',
        alignContent: 'center',
    },
})

export default ListNews
