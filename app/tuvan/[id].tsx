import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'
import moment from 'moment'
import { getTinNhans, getTinNhansByHoiThoaiId, postTinNhan } from '@services/hoiDapServices'
import { Conversation } from '@constants/HoiDap/HoiDapType'
// @ts-ignore
import chuyengia_avatar from '@assets/icons/chuyengia.jpg'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/View/IconButton'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
// @ts-ignore
import userImage from '@assets/icons/user.jpg'

const ChiTietHoiDap = () => {
    const { id, hoiThoaiId } = useLocalSearchParams()
    const navigation = useNavigation()
    const { userProfile } = useSelector((state: RootState) => state.user)
    const [conversation, setConversation] = useState<Conversation>()

    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')
    const scrollRef = useRef<ScrollView>(null)

    const fetchMessageByToUserId = async (toUserId: number) => {
        setLoading(true)
        const data = await getTinNhans(toUserId)
        setConversation(data)
        setLoading(false)
    }

    const fetchMessageByHoiThoaiId = async (hoiThoaiId: number) => {
        setLoading(true)
        const data = await getTinNhansByHoiThoaiId(hoiThoaiId)
        setConversation(data)
        setLoading(false)
    }

    useEffect(() => {
        if (hoiThoaiId) {
            fetchMessageByHoiThoaiId(+hoiThoaiId)
        } else fetchMessageByToUserId(+id)
    }, [id, hoiThoaiId])

    const handleSubmit = async () => {
        if (text && conversation) {
            const data = await postTinNhan(text, conversation?.id)
            if (data) {
                setConversation({
                    ...conversation,
                    tinNhans: [...conversation.tinNhans, data],
                })
                setText('')
            }
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Tư vấn doanh nghiệp',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            {conversation?.tinNhans?.length !== 0 && (
                <ScrollView
                    ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50, marginTop: 12 }}>
                    {conversation?.tinNhans?.map(item => (
                        <View key={item.id} style={styles.itemContainer}>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Image
                                    source={item.user.image ? { uri: item.user.image } : chuyengia_avatar}
                                    style={styles.itemImg}
                                />
                                <View style={{ gap: 2 }}>
                                    <Text style={styles.itemName}>{item.user.name}</Text>
                                    <Text style={styles.itemDate}>
                                        {moment(item.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[textStyles.longText]}>{item.noiDung}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

            {!loading && conversation?.tinNhans?.length === 0 && (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Bạn chưa có tin nhắn nào</Text>
                </View>
            )}

            <View style={bottomStyles.container}>
                <Image
                    source={userProfile?.image ? { uri: userProfile?.image } : userImage}
                    style={bottomStyles.image}
                />
                <View style={bottomStyles.inputContainer}>
                    <TextInput
                        style={bottomStyles.input}
                        value={text}
                        onChangeText={text => setText(text)}
                        placeholder='Aa.'
                    />
                    <IconButton onPress={handleSubmit}>
                        <Ionicons name='send' size={20} color={text.length === 0 ? 'grey' : Colors.default} />
                    </IconButton>
                </View>
            </View>
        </View>
    )
}

export default ChiTietHoiDap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: 12,
        padding: 16,
        gap: 8,
        elevation: 2,
    },
    itemImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
    },
    itemName: {
        fontWeight: '500',
        fontSize: 16,
    },
    itemDate: {
        color: Colors.textGray,
        fontWeight: '400',
        fontSize: 12,
    },
    modalTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 12,
    },
    modalInput: {
        borderWidth: 1,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
        padding: 8,
    },
})

const bottomStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        flex: 1,
        borderRadius: 30,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        padding: 6,
    },
    input: {
        flex: 1,
        paddingHorizontal: 6,
    },
})
