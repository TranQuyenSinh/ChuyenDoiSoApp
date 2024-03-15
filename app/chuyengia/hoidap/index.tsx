import React, { useState, useEffect, useLayoutEffect } from 'react'

import moment from 'moment'
import { router, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, Image, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import useToggle from '@hooks/useToggle'
import Modal from '@components/View/Modal'
import Button from '@components/View/Button'
import { textStyles } from '@constants/Styles'
import { MaterialIcons } from '@expo/vector-icons'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import { RootState, AppDispatch } from '@redux/store'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { fetchConversations } from '@services/hoiDapServices'
// @ts-ignore
import chuyengia_avatar from '@assets/icons/chuyengia.jpg'

const HoiDap = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await fetchConversations()
            setConversations(data)
            setLoading(false)
        })()
    }, [])

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
            <PageHeader title={'Cuộc trò chuyện'} style={{ marginBottom: 12 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {conversations?.map((item: Conversation) => (
                    <Pressable
                        onPress={() => router.push(`/chuyengia/hoidap/${item.chuyenGia.id}`)}
                        key={item.id}
                        style={styles.itemContainer}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Image
                                source={item.chuyenGia?.image ? { uri: item.chuyenGia.image } : chuyengia_avatar}
                                style={styles.itemImg}
                            />
                            <View style={{ gap: 2 }}>
                                <Text style={styles.itemName}>Chuyên gia {item.chuyenGia?.name}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default HoiDap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2f4ff',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 18,
        marginHorizontal: 16,
        padding: 16,
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
