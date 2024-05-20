import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenWidth } from '@utils/window'
import ImageComponent from '@components/View/ImageComponent'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { getSanPham, getSanPhamByDoanhNghiep, getSanPhamMoiNhat } from '@services/sanPhamServices'
import { router } from 'expo-router'
import Button from '@components/View/Button'
import { formatPrice } from '@utils/format'
import { Text } from '@components/View/Text'
import Colors from '@constants/Colors'
import RowComponent from '@components/View/RowComponent'

const LienKetSanPham = () => {
    const [sanPhams, setSanPhams] = useState<SanPham[]>([])
    const fetchSanPhams = async () => {
        const data = await getSanPhamMoiNhat()
        setSanPhams(data)
    }
    useEffect(() => {
        fetchSanPhams()
    }, [])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 18, paddingBottom: 20, paddingHorizontal: 6 }}>
            {sanPhams?.map((item, index) => (
                <Pressable key={index} style={styles.container} onPress={() => router.push(`/sanpham/${item.id}`)}>
                    <ImageComponent uri={item.hinhAnhs?.[0]?.hinhAnh} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={1} style={[styles.text, { flex: 1 }]}>
                            {item.tenSanPham}
                        </Text>
                        <RowComponent styles={{ width: '100%', marginTop: 4 }} justify='space-between'>
                            <Text color={Colors.default} style={styles.text}>
                                {formatPrice(item.gia)}đ
                            </Text>
                            <Button
                                onPress={() => router.push(`/sanpham/${item.id}`)}
                                textStyles={{ fontSize: 12 }}
                                btnStyles={{ borderRadius: 30, height: 25 }}
                                text='Xem ngay'
                            />
                        </RowComponent>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 8,
        width: 180,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: Colors.blueGray,
    },
    image: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
    },
    infoContainer: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 4,
        alignItems: 'flex-start',
        flex: 1,
    },
    text: {
        fontSize: 12,
        flexShrink: 0,
        textAlign: 'center',
        fontWeight: '500',
    },
})

export default LienKetSanPham
