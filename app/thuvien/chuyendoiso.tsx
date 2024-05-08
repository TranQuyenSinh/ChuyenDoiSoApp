import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
//@ts-ignore
import no_avatar from '@assets/images/no_image.png'
import { ThuVien } from '@constants/TinTuc/ThuVienTypes'
import { getThuViens } from '@services/commonServices'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'

const TaiLieuChuyenDoiSo = () => {
    const [data, setData] = useState<ThuVien[]>([])
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState<ThuVien[]>([])
    const renderItem = useCallback(({ item }: { item: ThuVien }) => {
        return (
            <View style={styles.item}>
                <Image style={styles.image} source={item.hinhAnh ? { uri: item.hinhAnh } : no_avatar} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.tieuDe}</Text>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.date}>{moment(item.namPhatHanh).format('DD MMMM, YYYY')}</Text>
                        <Pressable onPress={() => router.push(`/thuvien/${item.id}`)} style={styles.downloadButton}>
                            <Text style={styles.downloadText}>Xem</Text>
                            <Ionicons name='chevron-forward-circle-sharp' size={18} color={Colors.default} />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }, [])

    useEffect(() => {
        ;(async () => {
            const data = await getThuViens(2)
            setData(data)
        })()
    }, [])

    useEffect(() => {
        setFilteredItem(data.filter(item => item.tieuDe.toLowerCase().includes(search.toLowerCase())))
    }, [data, search])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Tài liệu Chuyển đổi số',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <View style={searchStyles.container}>
                <Ionicons name='search-sharp' size={24} color={'#626262'} />
                <TextInput
                    style={searchStyles.input}
                    value={search}
                    onChangeText={t => setSearch(t)}
                    placeholder='Nhập tên tài liệu cần tìm'
                    clearButtonMode='while-editing'
                    cursorColor={'#626262'}
                />
            </View>
            <FlatList data={filteredItem} keyExtractor={item => item.id + ''} renderItem={renderItem} />
        </View>
    )
}

export default TaiLieuChuyenDoiSo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    item: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 12,
        marginBottom: 12,
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
    },
    title: {
        color: '#eb8d1f',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    bottomInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    date: {
        color: '#454856',
        fontSize: 12,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    downloadText: {
        color: '#454856',
    },
})

const searchStyles = StyleSheet.create({
    container: {
        marginVertical: 12,
        marginHorizontal: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#fff',
        elevation: 10,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
    },
})
