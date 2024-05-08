import React, { useState, useEffect, useLayoutEffect } from 'react'

import { router, useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { Text, View, Image, Pressable, ScrollView, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import { RootState } from '@redux/store'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { getHoiThoais } from '@services/hoiDapServices'
// @ts-ignore
import chuyengia_avatar from '@assets/icons/chuyengia.jpg'
import RequireLogin from '@components/StatusPage/RequireLogin'
import BackgroundImage from '@components/View/BackgroundImage'
//@ts-ignore
import background from '@assets/backgrounds/hoidap.jpg'
const ChuyenGiaDangTuVan = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await getHoiThoais()
            setConversations(data)
            setLoading(false)
        })()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!isLoggedIn) return <RequireLogin />

    return (
        <View style={styles.container}>
            <BackgroundImage source={background} />
            <PageHeader tintColor='white' title={'Hỏi đáp chuyên gia'} style={{ marginBottom: 24 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.listContainer}>
                    {conversations?.map((item: Conversation) => (
                        <Pressable
                            android_ripple={{ color: 'gray' }}
                            onPress={() => router.push(`/tuvan/${item.chuyenGia.user.id}`)}
                            key={item.id}
                            style={styles.itemContainer}>
                            <View style={{ flexDirection: 'row', gap: 8, borderRadius: 12 }}>
                                <Image
                                    source={
                                        item.chuyenGia?.hinhAnh ? { uri: item.chuyenGia.hinhAnh } : chuyengia_avatar
                                    }
                                    style={styles.itemImg}
                                />
                                <View style={{ gap: 2, flexShrink: 1 }}>
                                    <Text style={styles.itemName}>{item.chuyenGia?.tenChuyenGia}</Text>
                                    <Text style={{ color: Colors.textGray }}>
                                        Lĩnh vực:{' '}
                                        <Text style={{ fontWeight: '600' }}>{item.chuyenGia?.linhVuc?.tenLinhVuc}</Text>
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default ChuyenGiaDangTuVan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    listContainer: {
        marginHorizontal: 16,
        backgroundColor: Colors.opacity.white,
        borderRadius: 12,
        overflow: 'hidden',
    },
    itemContainer: {
        padding: 16,
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
