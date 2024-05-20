import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SanPham as SanPhamType } from '@constants/DoanhNghiep/SanPhamType'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import { router } from 'expo-router'
import { formatPrice } from '@utils/format'
import Colors from '@constants/Colors'
export const ITEM_WIDTH = 140

interface SanPhamProps {
    data: SanPhamType
}

const SanPham = ({ data }: SanPhamProps) => {
    if (!data) return <View />
    return (
        <Pressable onPress={() => router.push(`/sanpham/${data.id}`)} style={styles.container}>
            <Image
                source={data.hinhAnhs?.[0]?.hinhAnh ? { uri: data.hinhAnhs?.[0]?.hinhAnh } : no_avatar}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {data.tenSanPham}
                </Text>
                <Text style={styles.price}>{formatPrice(data.gia)} đ</Text>
            </View>
        </Pressable>
    )
}

export default SanPham

const styles = StyleSheet.create({
    container: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        gap: 4,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d6d6',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 4,
        resizeMode: 'cover',
    },
    infoContainer: {
        width: '100%',
        padding: 8,
        paddingVertical: 6,
    },
    title: {
        fontSize: 12,
    },
    price: {
        fontSize: 12,
        fontWeight: '500',
    },
})
