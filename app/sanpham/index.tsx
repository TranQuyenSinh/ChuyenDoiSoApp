import React, { useLayoutEffect, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Image, Text, Pressable, Alert } from 'react-native'
import { useNavigation, router } from 'expo-router'
import Share, { ShareOptions } from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import { AppDispatch, RootState } from '@redux/store'
import PageHeader from '@components/View/PageHeader'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { deleteSanPham, getSanPhamByDoanhNghiep } from '@services/sanPhamServices'
import { doanhNghiepActions } from '@redux/doanhNghiepSlice'
import Loading from '@components/StatusPage/Loading'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
//@ts-ignore
import no_avatar from '@assets/images/no_image.png'
import { formatPrice } from '@utils/format'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '@components/View/IconButton'
import { toast } from '@utils/toast'
import LinearGradient from 'react-native-linear-gradient'

const index = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { doanhNghiep, sanPhams } = useSelector((state: RootState) => state.doanhNghiep)

    const fetchData = async (id: number) => {
        setLoading(true)
        const products = await getSanPhamByDoanhNghiep(id)
        dispatch(doanhNghiepActions.setSanPhams(products))
        setLoading(false)
    }

    const handleRemoveProduct = async (item: SanPham) => {
        Alert.alert(
            'Lưu ý',
            'Bạn có chắc muốn xóa sản phẩm này?',
            [
                {
                    text: 'Hủy bỏ',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const result = await deleteSanPham(item.id)
                        if (result) {
                            toast('Xóa sản phẩm thành công')
                            dispatch(doanhNghiepActions.setSanPhams(sanPhams?.filter(p => p.id !== item.id) || []))
                        }
                    },
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    const handleShare = async (item: SanPham) => {
        try {
            let Pictures = item.hinhAnhs.map(item =>
                RNFetchBlob.config({
                    fileCache: true,
                })
                    .fetch('GET', item.hinhAnh)
                    .then(resp => {
                        let base64s = RNFetchBlob.fs
                            .readFile(resp.data, 'base64')
                            .then(data => 'data:image/jpeg;base64,' + data)
                        return base64s
                    })
            )
            setLoading(true)
            Promise.all(Pictures).then(completed => {
                setLoading(false)
                const options: ShareOptions = {
                    message: item.moTa,
                    urls: completed,
                    subject: item.moTa,
                    title: item.moTa,
                }
                Share.open(options).then(res => res.success && toast('Chia sẻ thành công'))
            })
        } catch (error) {
            console.log('===> error: ', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (doanhNghiep) {
            fetchData(doanhNghiep.id)
        }
    }, [doanhNghiep])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#32acff', '#94d3fe']}>
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Your products</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={topStyles.subTitle}>Promote your product</Text>
                        <Button
                            text='Add new'
                            btnStyles={{ backgroundColor: Colors.orange, borderRadius: 30 }}
                            onPress={() => router.push('/sanpham/create')}
                        />
                    </View>
                </View>
            </LinearGradient>

            {loading && <Loading />}
            {/* {!loading && products.length === 0 && (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' }}>
                    <Text style={styles.notfoundText}>Bạn chưa cập nhật sản phẩm nổi bật</Text>
                    <Text style={styles.notfoundSubText}>Đăng để quảng bá sản phẩm của bạn đến mọi người!</Text>
                    <Button
                        btnStyles={styles.notfoundButton}
                        text='Đăng ngay'
                        onPress={() => router.push('/sanpham/create')}
                    />
                </View>
            )} */}

            {sanPhams?.length !== 0 && (
                <FlatList
                    keyExtractor={item => item.id + ''}
                    data={sanPhams || []}
                    contentContainerStyle={{ paddingHorizontal: 6 }}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push({ pathname: '/sanpham/edit', params: { id: item.id } })}
                            style={productStyles.container}>
                            <IconButton style={productStyles.removeBtn} onPress={() => handleRemoveProduct(item)}>
                                <Ionicons name='close-circle' size={24} color={'grey'} />
                            </IconButton>
                            <Image
                                defaultSource={no_avatar}
                                source={item.hinhAnhs?.[0]?.hinhAnh ? { uri: item.hinhAnhs[0].hinhAnh } : no_avatar}
                                style={productStyles.image}
                            />
                            <Text style={productStyles.name}>{item.tenSanPham}</Text>
                            <Text style={productStyles.price}>{formatPrice(item.gia)} đ</Text>
                            <Button btnStyles={{ width: '100%' }} text='Share now' onPress={() => handleShare(item)} />
                        </Pressable>
                    )}
                />
            )}
        </View>
    )
}

export default index

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
        fontSize: 20,
    },
    subTitle: {
        color: 'white',
        fontSize: 16,
    },
    searchContainer: {
        backgroundColor: 'white',
        marginHorizontal: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 12,
        gap: 8,
        marginBottom: 18,
    },
    input: {
        color: Colors.bodyText,
        fontSize: 16,
        flex: 1,
    },
})

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
        padding: 6,
        flex: 0.5,
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'white',
        margin: 6,
        borderRadius: 6,
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    name: {
        color: '#38383a',
        fontSize: 14,
        paddingHorizontal: 12,
        fontWeight: '500',
        textAlign: 'center',
        flex: 1,
    },
    price: {
        color: '#38383a',
        fontSize: 12,
    },
    removeBtn: {
        position: 'absolute',
        right: -12,
        top: 0,
        height: 50,
        width: 50,
        zIndex: 999,
    },
})
