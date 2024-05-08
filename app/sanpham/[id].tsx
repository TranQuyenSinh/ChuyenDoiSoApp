import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Loading from '@components/StatusPage/Loading'
import PageHeader from '@components/View/PageHeader'
import { textStyles } from '@constants/Styles'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import moment from 'moment'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { deleteAnhSanPham, getSanPham } from '@services/sanPhamServices'
import { AnhSanPham, SanPham } from '@constants/DoanhNghiep/SanPhamType'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
//@ts-ignore
import no_image from '@assets/images/no_image.png'
import BackgroundImage from '@components/View/BackgroundImage'
import NotFound from '@components/StatusPage/NotFound'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
const SanPhamDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [sanPham, setSanPham] = useState<SanPham | undefined>()
    const [selectImage, setSelectImage] = useState<AnhSanPham>()

    const fetchData = async () => {
        setLoading(true)
        const data = await getSanPham(+id)
        setSanPham(data)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    useEffect(() => {
        if (sanPham && sanPham?.hinhAnhs?.length !== 0) {
            setSelectImage(sanPham.hinhAnhs[0])
        }
    }, [sanPham])

    const handleRemoveImage = async (anhdId: number) => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa ảnh này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                onPress: async () => {
                    const result = await deleteAnhSanPham(anhdId)
                    if (result) {
                        const spNew = Object(sanPham)
                        spNew.hinhAnhs = spNew.hinhAnhs.filter((p: AnhSanPham) => p.id !== anhdId)
                        setSanPham(spNew)
                    }
                },
            },
        ])
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!sanPham) return

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Chi tiết sản phẩm'} style={{ marginBottom: 12 }} />
            <BackgroundImage source={background} />

            {loading && <Loading />}
            {!sanPham && <NotFound message='Không tìm thấy sản phẩm' />}

            {!loading && sanPham && (
                <>
                    <View style={styles.imageContainer}>
                        <Image
                            source={selectImage?.hinhAnh ? { uri: selectImage.hinhAnh } : no_image}
                            style={styles.itemImg}
                        />
                    </View>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 6 }} horizontal>
                        {sanPham.hinhAnhs.map((item, index) => (
                            <Pressable key={item.id} onPress={() => setSelectImage(item)}>
                                <Image
                                    key={index}
                                    source={item.hinhAnh ? { uri: item.hinhAnh } : no_image}
                                    style={{ width: 75, height: 75, borderRadius: 8, marginHorizontal: 8 }}
                                />
                                <IconButton style={styles.removeBtn} onPress={() => handleRemoveImage(item.id)}>
                                    <Ionicons name='close-circle' size={24} color={'black'} />
                                </IconButton>
                            </Pressable>
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    )
}

export default SanPhamDetail

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
    imageContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 18,
        marginHorizontal: 16,
        padding: 6,
        gap: 8,
    },
    itemImg: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    itemName: {
        fontWeight: '500',
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
    removeBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 50,
        width: 50,
        zIndex: 999,
    },
})
