import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Loading from '@components/StatusPage/Loading'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { deleteHoiThoai, getHoiThoais } from '@services/hoiDapServices'
import { router, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
//@ts-ignore
import avatar_default from '@assets/icons/chuyengia.jpg'
import NotFound from '@components/StatusPage/NotFound'
import { Ionicons } from '@expo/vector-icons'
import Button from '@components/View/Button'
import IconButton from '@components/View/IconButton'

const Inbox = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [search, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState<Conversation[]>([])
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await getHoiThoais()
            setConversations(data)
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        setFilteredItem(
            conversations.filter(item => item.doanhNghiep.tenTiengViet.toLowerCase().includes(search.toLowerCase()))
        )
    }, [conversations, search])

    const handleDeleteHoiThoai = async (id: number) => {
        const handleDelete = async () => {
            const isSuccess = await deleteHoiThoai(id)
            if (isSuccess) {
                setConversations(conversations.filter(item => item.id !== id))
            }
        }
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa cuộc trò chuyện này?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: handleDelete,
            },
        ])
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Doanh nghiệp đang tư vấn',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!loading && conversations?.length === 0) {
        return <NotFound message='Không có cuộc trò chuyện nào' />
    }
    return (
        <View style={styles.container}>
            <View style={searchStyles.container}>
                <Ionicons name='search-sharp' size={24} color={'#626262'} />
                <TextInput
                    style={searchStyles.input}
                    value={search}
                    onChangeText={t => setSearch(t)}
                    placeholder='Tên doanh nghiệp'
                    clearButtonMode='while-editing'
                    cursorColor={'#626262'}
                />
            </View>
            <ScrollView>
                {filteredItem?.map((item: Conversation) => (
                    <View style={styles.itemContainer} key={item.id}>
                        <IconButton onPress={() => handleDeleteHoiThoai(item.id)} style={styles.closeBtn}>
                            <Ionicons name='close' size={20} color={Colors.textGray} />
                        </IconButton>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Image
                                source={
                                    item?.doanhNghiep?.user?.image
                                        ? { uri: item?.doanhNghiep?.user?.image }
                                        : avatar_default
                                }
                                style={styles.itemImg}
                            />
                            <View style={{ gap: 4, flexShrink: 1 }}>
                                <Text style={styles.itemName}>{item.doanhNghiep?.tenTiengViet}</Text>
                                <Text style={styles.itemDate}>Đại diện: {item.doanhNghiep?.daiDien?.tenDaiDien}</Text>
                                <Text style={styles.itemDate}>
                                    Loại hình KD: {item.doanhNghiep?.loaiHinh?.tenLoaiHinh}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.itemBottom}>
                            <Button
                                btnStyles={styles.itemBtn}
                                text='Chi tiết'
                                onPress={() => router.push(`/doanhnghiep/${item.doanhNghiep.id}`)}
                            />
                            <Button
                                btnStyles={[styles.itemBtn, { backgroundColor: '#0fca58' }]}
                                text='Tư vấn'
                                onPress={() => router.push(`/tuvan/${item.doanhNghiep.id}`)}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: 16,
        padding: 16,
        marginBottom: 12,
    },
    itemImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    itemName: {
        fontWeight: '400',
        fontSize: 16,
    },
    itemDate: {
        color: Colors.textGray,
        fontWeight: '400',
        fontSize: 12,
    },
    itemBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        alignSelf: 'flex-end',
    },
    itemBtn: {
        flex: 1,
        borderRadius: 30,
        height: 35,
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
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
