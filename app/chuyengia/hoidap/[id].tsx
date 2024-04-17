import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import Modal from '@components/View/Modal'
import useToggle from '@hooks/useToggle'
import Button from '@components/View/Button'
import { fetchMessages, sendMessage } from '@services/hoiDapServices'
import { Conversation } from '@constants/HoiDap/HoiDapType'
// @ts-ignore
import chuyengia_avatar from '@assets/icons/chuyengia.jpg'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
//@ts-ignore
import background from '@assets/backgrounds/hoidap.jpg'
const ChiTietHoiDap = () => {
    // id = chuyengia_id
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [conversation, setConversation] = useState<Conversation>()

    const [loading, setLoading] = useState(false)
    const { isOpen, toggle } = useToggle()
    const [text, setText] = useState('')

    const fetchData = async () => {
        setLoading(true)
        const data = await fetchMessages(+id)
        setConversation(data)
        setLoading(false)
    }

    const handleSubmit = async () => {
        if (text && conversation) {
            await sendMessage(text, conversation?.id)
            toggle(false)
            setText('')
            fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Hỏi đáp chuyên gia'} style={{ marginBottom: 24 }} />
            <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />

            {conversation?.tinNhans?.length !== 0 && (
                <ScrollView showsVerticalScrollIndicator={false}>
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

            <Pressable
                android_ripple={{ color: 'grey' }}
                onPress={() => {
                    toggle(true)
                }}
                style={floatStyles.container}>
                <AntDesign name='pluscircle' size={24} color={Colors.default} />
                <Text>Thêm tin nhắn</Text>
            </Pressable>

            {!loading && conversation?.tinNhans?.length === 0 && (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Chọn biểu tượng + để thêm câu hỏi</Text>
                </View>
            )}

            <Modal isOpen={isOpen} toggle={toggle}>
                <Text style={styles.modalTitle}>Gửi câu hỏi đến chuyên gia</Text>
                <TextInput
                    placeholder='Nhập câu hỏi tại đây...'
                    style={styles.modalInput}
                    multiline
                    numberOfLines={10}
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Button btnStyles={{ width: '100%', marginTop: 12 }} text='Gửi' onPress={handleSubmit} />
            </Modal>
        </View>
    )
}

export default ChiTietHoiDap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2f4ff',
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    itemContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 18,
        marginHorizontal: 16,
        padding: 16,
        gap: 8,
    },
    itemImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
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
        borderWidth: StyleSheet.hairlineWidth,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
        padding: 8,
    },
})

const floatStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'row',
        padding: 8,
        gap: 4,
        alignItems: 'center',
    },
})
