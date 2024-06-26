import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { router, Stack, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { ThongBao } from '@constants/ThongBao/ThongBaoType'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { deleteThongBao, fetchThongBao, readThongBao } from '@redux/thongBaoSlice'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { stackOptions } from '@configs/ScreenConfig'
import { getThacMac } from '@services/thacMacServices'
import { thacMacActions } from '@redux/thacMac.slice'
const ThongBaoPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { thongBaos } = useSelector((state: RootState) => state.thongBao)
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchThongBao())
        }
    }, [isLoggedIn])

    const handlePress = async (item: ThongBao) => {
        if (item.loai && item.loaiId) {
            switch (item.loai) {
                case 'tinnhan':
                    router.push({
                        pathname: '/tuvan/0',
                        params: { hoiThoaiId: item.loaiId },
                    })
                    break
                case 'nhucau':
                    router.push({
                        pathname: `/doanhnghiep/${item.loaiId}`,
                    })
                    break
                case 'thacmac':
                    if (item && item.loaiId) {
                        const thacMac = await getThacMac(+item.loaiId)
                        dispatch(thacMacActions.setThacMac(thacMac))
                    }
                    router.push(`/thacmac/${item.loaiId}`)
                    break
            }
        }
        if (!item.daXem) {
            dispatch(readThongBao(item.id))
        }
    }

    const handleDelete = (item: ThongBao) => {
        dispatch(deleteThongBao(item.id))
    }

    if (!isLoggedIn) return <RequireLogin />

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Thông báo',
                    animation: 'fade_from_bottom',
                    ...stackOptions,
                }}
            />
            {thongBaos?.map((item: ThongBao) => (
                <TouchableOpacity
                    onPress={() => handlePress(item)}
                    key={item.id}
                    activeOpacity={0.8}
                    style={[styles.item, !item.daXem && { backgroundColor: '#e4f2ff' }]}>
                    {/* <View style={styles.avatarContainer}>
                        <Image source={no_avatar} style={styles.avatarImage} />
                    </View> */}
                    <View style={styles.content}>
                        <Text style={styles.title}>{item.tieuDe}</Text>
                        <Text style={styles.subTitle}>{item.noiDung}</Text>
                        <Text style={styles.time}>{moment(item.createdAt).fromNow()}</Text>
                    </View>
                    <IconButton onPress={() => handleDelete(item)}>
                        <Ionicons name='close-outline' size={24} color={Colors.default} />
                    </IconButton>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default ThongBaoPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#dfe4e7',
        paddingLeft: 24,
    },
    avatarContainer: {
        marginHorizontal: 6,
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    content: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontWeight: '500',
        color: '#393938',
        fontSize: 15,
    },
    subTitle: {
        lineHeight: 16,
        color: '#696d6c',
    },
    time: {
        color: '#4b89bf',
        fontSize: 12,
    },
})
