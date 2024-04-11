import { Image, ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import { getChuyenGia } from '@services/chuyenGiaServices'
import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import Colors from '@constants/Colors'
import { defaultStyles, textStyles } from '@constants/Styles'
import Button from '@components/View/Button'
import { Ionicons } from '@expo/vector-icons'

const ChuyenGiaDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [chuyenGia, setChuyenGia] = useState<ChuyenGia | undefined>()
    const [loading, setLoading] = useState(false)

    const fetchChuyenGia = async (id: number) => {
        setLoading(true)
        const data = await getChuyenGia(id)
        setChuyenGia(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchChuyenGia(+id)
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading || !chuyenGia) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Thông tin chuyên gia'} style={{ marginBottom: 24 }} />
            <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.section, { flexDirection: 'row', gap: 12 }]}>
                    <Image source={chuyenGia.hinhAnh ? { uri: chuyenGia.hinhAnh } : no_avatar} style={styles.image} />
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View>
                            <Text style={styles.ten}>{chuyenGia?.tenChuyenGia}</Text>
                            <Text>Lĩnh vực: {chuyenGia.linhVuc?.tenLinhVuc}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <Button
                                btnStyles={{ flex: 1, backgroundColor: Colors.success }}
                                text='Gọi điện'
                                onPress={() => Linking.openURL(`tel:${chuyenGia.sdt}`)}
                            />
                            <Button
                                btnStyles={{ flex: 1, backgroundColor: Colors.orange }}
                                text='Nhắn tin'
                                onPress={() => router.push(`/chuyengia/hoidap/${chuyenGia.id}`)}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Giới thiệu</Text>
                    <Text style={textStyles.longText}>{chuyenGia?.moTa}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.infoItem}>
                        <Text style={styles.title}>Email</Text>
                        <Text style={textStyles.longText}>{chuyenGia?.email}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.title}>Điện thoại</Text>
                        <Text style={textStyles.longText}>{chuyenGia?.sdt}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.title}>Địa chỉ</Text>
                        <Text style={textStyles.longText}>{chuyenGia?.diaChi}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ChuyenGiaDetail

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
    section: {
        backgroundColor: Colors.opacity.white,
        borderRadius: 12,
        marginBottom: 12,
        marginHorizontal: 16,
        padding: 16,
    },
    image: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    ten: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.bodyText,
    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    infoItem: {
        marginBottom: 12,
    },
})
