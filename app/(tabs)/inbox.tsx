import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '@components/StatusPage/Loading'
import { Conversation } from '@constants/HoiDap/HoiDapType'
import { fetchChuyenGiaConversations } from '@services/hoiDapServices'
import TabPageHeader from '@components/View/TabPageHeader'
import { router } from 'expo-router'
import Colors from '@constants/Colors'
//@ts-ignore
import avatar_default from '@assets/icons/chuyengia.jpg'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import NotFound from '@components/StatusPage/NotFound'

const Inbox = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const { userProfile } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await fetchChuyenGiaConversations()
            setConversations(data)
            // console.log('===> id ==== ', userProfile?.id)
            console.log('===> ', data?.[0]?.doanhNghiep?.loaiHinh?.tenLoaiHinh)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (!loading && conversations?.length === 0) {
        return <NotFound message='Không có cuộc trò chuyện nào' />
    }
    return (
        <SafeAreaView style={styles.container}>
            <TabPageHeader title={'Tin nhắn gần đây'} />
            <ScrollView style={{ marginTop: 12 }}>
                {conversations?.map((item: Conversation) => (
                    <Pressable
                        android_ripple={{ color: 'gray' }}
                        onPress={() => router.push(`/chuyengia/hoidap/${item.chuyenGia.id}`)}
                        key={item.id}
                        style={styles.itemContainer}>
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
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: Colors.white,
        // borderRadius: 8,
        // marginBottom: 18,
        marginHorizontal: 16,
        padding: 16,
        // elevation: 4,
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
})
