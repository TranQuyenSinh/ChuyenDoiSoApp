import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
//@ts-ignore
import background from '@assets/backgrounds/doanhnghiepdetail.jpg'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghiep } from '@services/doanhNghiepServices'
import NotFound from '@components/StatusPage/NotFound'
import { getSanPhamByDoanhNghiep } from '@services/sanPhamServices'
import SanPhamComponent, { ITEM_WIDTH } from '@components/SanPham/SanPham'
import { SanPham } from '@constants/DoanhNghiep/SanPhamType'
import BackgroundImage from '@components/View/BackgroundImage'
import moment from 'moment'
import DiemLineChart from '@components/KhaoSat/ThongKe/DiemLineChart'
import { getKhaoSatByDoanhNghiep } from '@services/khaoSatServices'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { windowWidth } from '@utils/window'
import RadarChart from '@components/KhaoSat/ThongKe/RadarChart'
import { useDangNhap } from '@hooks/useDangNhap'
import { ROLES } from '@constants/Constants'
import Button from '@components/View/Button'

const ITEM_GAP = 12

const DoanhNghiepDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [data, setData] = useState<DoanhNghiep | undefined>()
    const [products, setProducts] = useState<SanPham[]>([])
    const [loading, setLoading] = useState(false)
    const [khaoSats, setKhaoSats] = useState<KhaoSat[]>([])
    const { isInRole } = useDangNhap()
    const nhuCauMoiNhat = useMemo(() => {
        if (data && data.nhuCau && data.nhuCau.length > 0) {
            return data.nhuCau.sort((a, b) => b.id - a.id)[0]
        }
    }, [data])

    const fetchData = async (id: number) => {
        setLoading(true)
        const data = await getDoanhNghiep(id)
        setData(data)
        const products = await getSanPhamByDoanhNghiep(id)
        setProducts(products)
        const khaoSats = await getKhaoSatByDoanhNghiep(id)
        setKhaoSats(khaoSats)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(+id)
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!data) {
        return <NotFound message='Có lỗi xảy ra, vui lòng thử lại!' />
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ height: 200 }}>
                <PageHeader tintColor='white' title={''} style={{ marginBottom: 12 }} />
                <BackgroundImage source={background} />
                <View style={styles.info}>
                    <Image source={data.user?.image ? { uri: data.user?.image } : no_avatar} style={styles.image} />
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.ten}>{data?.tenTiengViet}</Text>
                            <Text style={styles.text}>Địa chỉ: {data.diaChi}</Text>
                            <Text style={styles.text}>Điện thoại: {data.sdt}</Text>
                            <Text style={styles.text}>Email: {data.user?.email}</Text>
                            {data.website && <Text style={styles.text}>Website: {data.website}</Text>}
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.title}>Mô tả</Text>
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>Người đại diện:</Text>
                        <Text style={styles.rowText}>{data.daiDien.tenDaiDien}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>Ngày thành lập:</Text>
                        {data.ngayLap && (
                            <Text style={styles.rowText}>{moment(data.ngayLap).format('DD/MM/YYYY')}</Text>
                        )}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>Loại hình kinh doanh:</Text>
                        {data?.linhVuc?.tenLinhVuc && <Text style={styles.rowText}>{data.loaiHinh?.tenLoaiHinh}</Text>}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>Ngành nghề chính:</Text>
                        {data?.loaiHinh?.tenLoaiHinh && (
                            <Text style={styles.rowText}>{data.nganhNghe?.tenNganhNghe}</Text>
                        )}
                    </View>
                    {data.moTa && <Text style={styles.description}>{data.moTa}</Text>}
                </View>

                {products.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.title}>Sản phẩm nổi bật</Text>
                        <ScrollView
                            horizontal
                            disableIntervalMomentum={true}
                            snapToInterval={ITEM_WIDTH + ITEM_GAP}
                            contentContainerStyle={{ gap: ITEM_GAP }}
                            showsHorizontalScrollIndicator={false}>
                            {products.map(item => (
                                <SanPhamComponent data={item} key={item.id} />
                            ))}
                        </ScrollView>
                    </View>
                )}
                {khaoSats && khaoSats.length !== 0 && (
                    <View style={styles.section}>
                        <Text style={styles.title}>Hiện trạng Chuyển đổi số</Text>
                        <View style={{ alignSelf: 'center' }}>
                            <View style={{ marginBottom: 8, gap: 2 }}>
                                <View style={styles.row}>
                                    <Text style={styles.rowTitle}>Điểm đánh giá:</Text>
                                    <Text style={styles.rowText}>{khaoSats[0].tongDiem}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.rowTitle}>Mức độ:</Text>
                                    <Text style={styles.rowText}>{khaoSats[0]?.mucDo?.tenMucDo}</Text>
                                </View>
                            </View>
                            <DiemLineChart khaoSatsInput={khaoSats} width={windowWidth - 60} />
                            <View style={{ marginVertical: 4 }} />
                            <RadarChart data={khaoSats[0]} width={windowWidth - 60} />
                        </View>
                    </View>
                )}
                {isInRole(ROLES.CHUYEN_GIA) && nhuCauMoiNhat && (
                    <View style={styles.section}>
                        <Text style={[styles.title, { marginBottom: 2 }]}>Nhu cầu Chuyển đổi số</Text>
                        {nhuCauMoiNhat.nhuCau.split('; ').map(item => (
                            <Text key={item} style={styles.rowTitle}>
                                • {item}
                            </Text>
                        ))}

                        <Text style={[styles.title, { marginBottom: 2, marginTop: 6 }]}>Mong muốn cải thiện</Text>
                        {nhuCauMoiNhat.caiThien.split('; ').map(item => (
                            <Text key={item} style={styles.rowTitle}>
                                • {item}
                            </Text>
                        ))}
                    </View>
                )}

                {isInRole(ROLES.CHUYEN_GIA) && (
                    <Button
                        btnStyles={styles.button}
                        text='Tư vấn'
                        onPress={() => router.push(`/tuvan/${data.user?.id}`)}
                    />
                )}
            </View>
        </ScrollView>
    )
}

export default DoanhNghiepDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    info: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -50,
        left: 16,
        right: 16,
        elevation: 10,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        alignItems: 'center',
    },
    body: {
        marginTop: 75,
        flex: 1,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    rowTitle: {},
    rowText: {
        color: '#080808',
        fontWeight: '500',
        flexShrink: 1,
        textAlign: 'right',
    },
    description: {
        marginTop: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        borderRadius: 50,
        resizeMode: 'contain',
    },
    infoContainer: {
        gap: 4,
    },
    ten: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#344049',
    },
    text: {
        fontSize: 12,
    },
    title: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#343c48',
    },
    button: {
        marginHorizontal: 12,
        marginBottom: 24,
    },
})
