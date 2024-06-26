import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '@components/StatusPage/Loading'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { getSanPham, getSanPhamByDoanhNghiep, getSanPhamRandom } from '@services/sanPhamServices'
import { AnhSanPham, SanPham } from '@constants/DoanhNghiep/SanPhamType'
//@ts-ignore
import no_image from '@assets/images/no_image.png'
import SanPhamComponent from '@components/SanPham/SanPham'
import { stackOptions } from '@configs/ScreenConfig'
import { formatPrice } from '@utils/format'
import Colors from '@constants/Colors'
import Button from '@components/View/Button'
import { useAppDispatch } from '@redux/store'
import { trungTamActions } from '@redux/trungTamSlice'
import ImageComponent from '@components/View/ImageComponent'
import { Text } from '@components/View/Text'
import RowComponent from '@components/View/RowComponent'
import SpaceComponent from '@components/View/SpaceComponent'
import { Ionicons } from '@expo/vector-icons'
import { Skeleton } from 'moti/skeleton'
import Animated, { FadeIn, FadeInDown, Layout, ZoomIn, ZoomOut } from 'react-native-reanimated'
const SanPhamDetail = () => {
    const { id } = useLocalSearchParams()
    const [loading, setLoading] = useState(false)
    const [sanPham, setSanPham] = useState<SanPham | undefined>()
    const [spCungDN, setSpCungDN] = useState<SanPham[] | undefined>()
    const [selectImage, setSelectImage] = useState<AnhSanPham>()
    const [spKhac, setSpKhac] = useState<SanPham[] | undefined>()
    const dispatch = useAppDispatch()

    const fetchData = async () => {
        setLoading(true)
        const data = await getSanPham(+id)
        setSanPham(data)
        if (data?.doanhNghiep) {
            const spCungDn = await getSanPhamByDoanhNghiep(data.doanhNghiep.id || 0)
            setSpCungDN(spCungDn?.filter(item => item.id !== data.id) || [])
        }
        const spKhac = await getSanPhamRandom()
        setSpKhac(spKhac.filter(item => item.id !== data?.id) || [])
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

    const handleShowWebview = () => {
        dispatch(
            trungTamActions.selectChuongTrinh({
                name: 'Đặc sản An Giang',
                link: sanPham?.doanhNghiep?.gianHang || 'https://dacsan.cdsdnag.com',
            })
        )
        router.push('/web')
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <Stack.Screen
                    options={{
                        title: 'Chi tiết sản phẩm',
                        animation: 'slide_from_right',
                        ...stackOptions,
                    }}
                />

                {!loading ? (
                    <Animated.View layout={Layout} entering={FadeInDown.duration(800)} style={{ flex: 1 }}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={selectImage?.hinhAnh ? { uri: selectImage.hinhAnh } : no_image}
                                style={styles.itemImg}
                            />
                        </View>
                        {sanPham && sanPham.hinhAnhs?.length > 1 && (
                            <View style={{ alignItems: 'center' }}>
                                <ScrollView
                                    style={{ flexGrow: 0 }}
                                    contentContainerStyle={{ paddingHorizontal: 6 }}
                                    horizontal>
                                    {sanPham.hinhAnhs.map((item, index) => (
                                        <Pressable key={item.id} onPress={() => setSelectImage(item)}>
                                            <Image
                                                key={index}
                                                source={item.hinhAnh ? { uri: item.hinhAnh } : no_image}
                                                style={[
                                                    styles.smallImage,
                                                    selectImage?.id === item.id && {
                                                        borderWidth: 2,
                                                        borderColor: Colors.orange,
                                                    },
                                                ]}
                                            />
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{sanPham?.tenSanPham}</Text>
                            <Text style={styles.price}>{formatPrice(sanPham?.gia)}đ</Text>
                            <Text style={styles.description}>{sanPham?.moTa}</Text>

                            {/* Đơn vị bán */}
                            <Pressable
                                onPress={() => router.push(`/doanhnghiep/${sanPham?.doanhNghiep?.id}`)}
                                style={styles.section}>
                                <RowComponent gap={12}>
                                    <ImageComponent uri={sanPham?.doanhNghiep?.user?.image} style={styles.avatar} />
                                    <View style={styles.sectionInfo}>
                                        <Text fontSize={16} fontWeight='600' style={styles.text}>
                                            {sanPham?.doanhNghiep?.tenTiengViet}
                                        </Text>
                                        <Text style={styles.text}>Địa chỉ: {sanPham?.doanhNghiep?.diaChi}</Text>
                                        <Text style={styles.text}>Điện thoại: {sanPham?.doanhNghiep?.sdt}</Text>
                                        <Text style={styles.text}>Email: {sanPham?.doanhNghiep?.user?.email}</Text>
                                    </View>
                                </RowComponent>
                            </Pressable>

                            {spCungDN && spCungDN.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>Sản phẩm cùng gian hàng</Text>
                                    <ScrollView
                                        horizontal
                                        disableIntervalMomentum={true}
                                        snapToInterval={140 + 12}
                                        contentContainerStyle={{ gap: 12 }}
                                        showsHorizontalScrollIndicator={false}>
                                        {spCungDN.map(item => (
                                            <SanPhamComponent data={item} key={item.id} />
                                        ))}
                                    </ScrollView>
                                </>
                            )}

                            {spKhac && spKhac.length > 0 && (
                                <>
                                    <SpaceComponent height={10} />
                                    <Text style={styles.sectionTitle}>Sản phẩm khác</Text>
                                    <ScrollView
                                        horizontal
                                        disableIntervalMomentum={true}
                                        snapToInterval={140 + 12}
                                        contentContainerStyle={{ gap: 12 }}
                                        showsHorizontalScrollIndicator={false}>
                                        {spKhac.map(item => (
                                            <SanPhamComponent data={item} key={item.id} />
                                        ))}
                                    </ScrollView>
                                </>
                            )}
                        </View>
                    </Animated.View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <View style={styles.imageContainer}>
                            <Skeleton colorMode='light' height={250} width={'100%'} />
                        </View>

                        <View style={styles.infoContainer}>
                            <Skeleton colorMode='light' height={25} width={'100%'} />
                            <Skeleton colorMode='light' height={20} width={'20%'} />
                            <Skeleton colorMode='light' height={20} width={'50%'} />
                            <Skeleton colorMode='light' height={20} width={'60%'} />
                            <Skeleton colorMode='light' height={20} width={'70%'} />
                            <Skeleton colorMode='light' height={80} width={'100%'} />
                        </View>
                    </View>
                )}
            </ScrollView>
            {!loading && sanPham?.doanhNghiep?.gianHang && (
                <Button
                    btnStyles={styles.button}
                    textStyles={styles.buttonText}
                    text='Mua hàng'
                    renderIcon={<Ionicons name='cart-sharp' size={24} color={'white'} />}
                    onPress={handleShowWebview}
                />
            )}
        </View>
    )
}

export default SanPhamDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    imageContainer: {
        backgroundColor: Colors.white,
        marginBottom: 18,
        gap: 8,
    },
    itemImg: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
    smallImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    infoContainer: {
        flex: 1,
        marginTop: 12,
        paddingHorizontal: 24,
        gap: 12,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'mon-b',
    },
    price: {
        fontSize: 16,
        color: Colors.error.default,
    },
    description: {
        lineHeight: 20,
        color: Colors.bodyText,
    },

    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20,
        height: 50,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: Colors.orange,
    },
    buttonText: {
        fontFamily: 'mon-sb',
        fontSize: 15,
    },
    sectionTitle: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 4,
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    sectionInfo: {
        gap: 2,
        flex: 1,
    },
    avatar: {
        width: 80,
        height: 80,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        borderRadius: 50,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 12,
        flexShrink: 0,
    },
})
