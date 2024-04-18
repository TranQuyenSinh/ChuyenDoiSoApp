import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Alert } from 'react-native'
import { useNavigation } from 'expo-router'

import { AppDispatch, RootState } from '@redux/store'
import PageHeader from '@components/View/PageHeader'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import { deleteSanPham, getSanPhamByDoanhNghiep } from '@services/sanPhamServices'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import Loading from '@components/StatusPage/Loading'
import Colors from '@constants/Colors'
import { useFocusEffect } from 'expo-router'
//@ts-ignore
import BackgroundImage from '@components/View/BackgroundImage'
import { toast } from '@utils/toast'
import { BaiViet } from '@constants/DienDan/DienDanTypes'
import { getBaiVietsByDoanhNghiep } from '@services/dienDanServices'

const QuanLyBaiViet = () => {
    const navigation = useNavigation()
    const [posts, setPosts] = useState<BaiViet[]>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { doanhNghiep, status } = useSelector((state: RootState) => state.doanhNghiep)

    const fetchData = async (id: number) => {
        setLoading(true)
        const data = await getBaiVietsByDoanhNghiep(id)
        setPosts(data)
        setLoading(false)
    }

    useFocusEffect(
        useCallback(() => {
            if (doanhNghiep?.id) {
                fetchData(doanhNghiep?.id)
            }
        }, [doanhNghiep])
    )

    const handleDelete = async (item: BaiViet) => {
        Alert.alert(
            'Lưu ý',
            'Bạn có chắc muốn xóa bài viết này?',
            [{
                text: 'Đồng ý', onPress: async () => {
                    const result = await deleteSanPham(item.id)
                    if (result) {
                        toast('Xóa bài viết thành công')
                        setPosts(posts.filter(p => p.id !== item.id))
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Bài viết của bạn'} style={{ marginBottom: 12 }} />
            <BackgroundImage source={background} blurRadius={10} />
            {loading && <Loading />}



        </View>
    )
}

export default QuanLyBaiViet

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
