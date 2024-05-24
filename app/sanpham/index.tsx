import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import BackgroundImage from '@components/View/BackgroundImage'
import { appImages } from '@constants/Images'
import { StatusBar } from 'expo-status-bar'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { getAllSanPham } from '@services/sanPhamServices'
import { nullArray } from '@utils/common'
import { Skeleton } from 'moti/skeleton'
import ImageComponent from '@components/View/ImageComponent'
import Colors from '@constants/Colors'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { formatPrice } from '@utils/format'
import Button from '@components/View/Button'
import { Ionicons } from '@expo/vector-icons'

const ListSanPham = () => {
    const [sanPhams, setSanPhams] = useState<SanPham[] | undefined>()
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    useEffect(() => {
        ;(async () => {
            const data = await getAllSanPham()
            setSanPhams(data)
        })()
    }, [])

    const renderProduct = useCallback(({ item }: { item: SanPham | null }) => {
        return (
            <>
                {item ? (
                    <AnimatedPressable
                        onPress={() => router.push(`/sanpham/${item.id}`)}
                        layout={Layout}
                        entering={FadeIn.duration(800)}
                        style={productStyle.container}>
                        <ImageComponent uri={item.hinhAnhs?.[0]?.hinhAnh} style={productStyle.image} />
                        <View style={productStyle.infoContainer}>
                            <Text numberOfLines={2} style={productStyle.title}>
                                {item?.tenSanPham}
                            </Text>
                            <Text style={productStyle.price}>{formatPrice(item.gia)}đ</Text>
                        </View>
                        <Button
                            renderIcon={<Ionicons name='cart-sharp' size={16} color={'white'} />}
                            onPress={() => router.push(`/sanpham/${item.id}`)}
                            text='Xem chi tiết'
                            btnStyles={productStyle.button}
                        />
                    </AnimatedPressable>
                ) : (
                    <View style={{ flex: 0.5, margin: 2 }}>
                        <Skeleton colorMode='light' height={200} width={'100%'} />
                    </View>
                )}
            </>
        )
    }, [])

    return (
        <ScrollView style={styles.container}>
            {/* Config screen */}
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='transparent' />

            {/* Top */}
            <View>
                <BackgroundImage blurRadius={7} source={appImages.sanpham_bg} />
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Danh sách sản phẩm</Text>
                </View>
            </View>

            {/* Content */}
            <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={sanPhams || nullArray(6)}
                keyExtractor={(item, index) => item?.id.toString() || index.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 6, paddingBottom: 50 }}
                renderItem={renderProduct}
            />
        </ScrollView>
    )
}

const productStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 0.5,
        margin: 4,
        borderRadius: 4,
        overflow: 'hidden',
        elevation: 20,
    },
    image: {
        width: '100%',
        height: 150,
    },
    infoContainer: {
        flex: 1,
        padding: 8,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    title: {
        fontWeight: '600',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
    },
    button: {
        width: '100%',
        borderRadius: 0,
        height: 30,
    },
})

const topStyles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 24,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 4 },
    },
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
})

export default ListSanPham
