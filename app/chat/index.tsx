import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Loading from '@components/StatusPage/Loading'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { router, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
import NotFound from '@components/StatusPage/NotFound'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/View/IconButton'
import { deleteConversation, getAllConversations } from '@services/chatServices'
import { deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { messageRef } from '@configs/firebaseConfig'
import ImageComponent from '@components/View/ImageComponent'
import { stackOptions } from '@configs/ScreenConfig'

const ConversationList = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [filteredItem, setFilteredItem] = useState<Conversation[]>([])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await getAllConversations()
            setConversations(data)
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        setFilteredItem(conversations.filter(item => item.user?.name.toLowerCase().includes(search.toLowerCase())))
    }, [conversations, search])

    const handleDeleteConversation = async (id: number) => {
        const handleDelete = async () => {
            const isSuccess = await deleteConversation(id)
            if (isSuccess) {
                setConversations(conversations.filter(item => item.id !== id))
            }
            let messageQuery = query(messageRef, where('conversation_id', '==', id))
            let querySnapshot = await getDocs(messageQuery)

            querySnapshot.forEach(function (doc) {
                deleteDoc(doc.ref)
            })
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
            headerTitle: 'Nhắn tin',
            ...stackOptions,
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
                    placeholder='Tên người dùng'
                    clearButtonMode='while-editing'
                    cursorColor={'#626262'}
                />
            </View>
            <ScrollView>
                {filteredItem?.map((item: Conversation) => (
                    <Pressable
                        onPress={() => router.push(`/chat/${item.user?.id}`)}
                        style={styles.itemContainer}
                        key={item.id}>
                        <IconButton onPress={() => handleDeleteConversation(item.id)} style={styles.closeBtn}>
                            <Ionicons name='close' size={20} color={Colors.textGray} />
                        </IconButton>
                        <ImageComponent uri={item?.user?.image} style={styles.itemImg} />
                        <View style={{ gap: 4, flexShrink: 1 }}>
                            <Text style={styles.itemName}>{item.user?.name}</Text>
                            {/* <Text style={styles.itemDate}>Đại diện: {item.doanhNghiep?.daiDien?.tenDaiDien}</Text>
                                <Text style={styles.itemDate}>
                                    Loại hình KD: {item.doanhNghiep?.loaiHinh?.tenLoaiHinh}
                                </Text> */}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default ConversationList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: 16,
        padding: 16,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.blueGray,
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
