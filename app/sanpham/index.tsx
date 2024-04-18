import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, StyleSheet, Image, Text, Pressable, Alert } from 'react-native'
import { useNavigation, router } from 'expo-router'

import { AppDispatch, RootState } from '@redux/store'
import PageHeader from '@components/View/PageHeader'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { deleteSanPham, getSanPhamByDoanhNghiep } from '@services/sanPhamServices'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import Loading from '@components/StatusPage/Loading'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { useFocusEffect } from 'expo-router'
import { FlatList } from 'react-native-gesture-handler'
//@ts-ignore
import no_avatar from '@assets/images/no_image.png'
import { formatPrice } from '@utils/format'
import { Ionicons } from '@expo/vector-icons'
import BackgroundImage from '@components/View/BackgroundImage'
import IconButton from '@components/View/IconButton'
import { toast } from '@utils/toast'

const index = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState<SanPham[]>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)

    const fetchData = async (id: number) => {
        setLoading(true)
        const products = await getSanPhamByDoanhNghiep(id)
        setProducts(products)
        setLoading(false)
    }

    const handleRemoveProduct = async (item: SanPham) => {
        Alert.alert(
            'Lưu ý',
            'Bạn có chắc muốn xóa sản phẩm này?',
            [{
                text: 'Đồng ý', onPress: async () => {
                    const result = await deleteSanPham(item.id)
                    if (result) {
                        toast('Xóa sản phẩm thành công')
                        setProducts(products.filter(p => p.id !== item.id))
                    }
                }
            },
            {
                text: 'Hủy bỏ',
                style: 'cancel'
            }
            ],
            {
                cancelable: true,
            }
        )
    }

    useEffect(() => {
        dispatch(fetchDoanhNghiepInfo())
    }, [])

    useFocusEffect(
        useCallback(() => {
            if (doanhNghiep?.id) {
                fetchData(doanhNghiep?.id)
            }
        }, [doanhNghiep])
    )
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Sản phẩm nổi bật của bạn'} style={{ marginBottom: 12 }} />
            <BackgroundImage source={background} blurRadius={10} />

            {loading || (status === 'loading' && <Loading />)}
            {!loading && status !== 'loading' && products.length === 0 && (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' }}>
                    <Text style={styles.notfoundText}>Bạn chưa cập nhật sản phẩm nổi bật</Text>
                    <Text style={styles.notfoundSubText}>Đăng để quảng bá sản phẩm của bạn đến mọi người!</Text>
                    <Button
                        btnStyles={styles.notfoundButton}
                        text='Đăng ngay'
                        onPress={() => router.push('/sanpham/create')}
                    />
                </View>
            )}

            {!loading && status !== 'loading' && products.length !== 0 && (
                <View style={styles.selectRow}>
                    <Text style={styles.title}>Đã đăng ({products.length}/10) sản phẩm</Text>
                    {products.length < 10 && (
                        <Pressable onPress={() => router.push('/sanpham/create')} style={styles.selectButton}>
                            <Ionicons name='add' size={24} color={'white'} />
                        </Pressable>
                    )}
                </View>
            )}

            {products.length !== 0 && (
                <FlatList
                    keyExtractor={(item, index) => item.id + ''}
                    data={products}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push({ pathname: '/sanpham/edit', params: { id: item.id } })}
                            style={productStyles.container}>
                            <IconButton style={productStyles.removeBtn} onPress={() => handleRemoveProduct(item)}>
                                <Ionicons name='close-circle' size={24} color={"black"} />
                            </IconButton>
                            <Image
                                source={item.hinhAnhs?.[0]?.hinhAnh ? { uri: item.hinhAnhs[0].hinhAnh } : no_avatar}
                                style={productStyles.image}
                            />
                            <Text style={productStyles.name}>{item.tenSanPham}</Text>
                            <Text style={productStyles.price}>{formatPrice(item.gia)} đ</Text>
                        </Pressable>
                    )}
                />
            )}
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    selectRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        // marginBottom: 6,
    },
    selectButton: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: Colors.default,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ffffffcd',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    notfoundText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        paddingHorizontal: 16,
    },
    notfoundSubText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 16,
        marginTop: 12,
    },
    notfoundButton: {
        backgroundColor: Colors.orange,
        marginTop: 12,
    },
})

const productStyles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 0.5,
        alignItems: 'center',
        gap: 6,
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    name: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    price: {
        color: 'white',
    },
    removeBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 50,
        width: 50,
        zIndex: 999
    }
})
