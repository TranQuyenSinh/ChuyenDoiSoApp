import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { defaultStyles, textStyles } from '@constants/Styles'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { timKiemTinTucByTuKhoa } from '@services/tinTucServices'
import SearchBar from '@components/TinTuc/SearchBar'
import { News } from '@components/TinTuc/News'
import Loading from '@components/StatusPage/Loading'
import NotFound from '@components/StatusPage/NotFound'

const SearchNews = () => {
    const navigation = useNavigation()

    const { searchKey: search } = useLocalSearchParams()
    const [searchKey, setSearchKey] = useState(search)
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const news = await timKiemTinTucByTuKhoa(searchKey)
        setNews(news)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <SearchBar searchKey={searchKey} onChangeSearchKey={setSearchKey} onSearch={fetchData} />
            {!loading && (
                <FlatList
                    data={news}
                    keyExtractor={item => item.id}
                    // refreshControl={<RefreshControl refreshing={refresing} onRefresh={fetchData} />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <News key={item.id} item={item} />
                    }}
                />
            )}
            {loading && <Loading />}
            {news?.length === 0 && !loading && <NotFound message='Không tìm thấy tin phù hợp' isShownBtn={false} />}
        </View>
    )
}

export default SearchNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    searchContainer: {
        backgroundColor: Colors.white,
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: Colors.bodyText,
        borderWidth: 1,
        borderRadius: 6,
        // margin: 16,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 44,
        overflow: 'hidden',
        flex: 1,
    },
})
