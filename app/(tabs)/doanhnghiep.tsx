import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { defaultStyles } from '@constants/Styles'
import Seperator from '@components/View/Seperator'
import { interpolate } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { windowWidth } from '@utils/window'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghieps } from '@services/doanhNghiepServices'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import { StatusBar } from 'expo-status-bar'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import Button from '@components/View/Button'
interface CartItemProps {
    data: DoanhNghiep
}
const CardItem = (props: CartItemProps) => {
    const { data } = props
    return (
        <View style={cardStyles.cardContainer}>
            <View style={cardStyles.cardTop}>
                <Image
                    source={
                        data.user?.image
                            ? {
                                uri: data.user?.image,
                            }
                            : no_avatar
                    }
                    style={cardStyles.cardImage}
                />
                <View style={cardStyles.cardInfo}>
                    <Text style={cardStyles.cardTitle}>{data.tenTiengViet}</Text>
                    <Text style={cardStyles.cardText}>Mã số thuế: {data.maThue}</Text>
                    <Text style={cardStyles.cardText}>Đại diện pháp luật: {data.daiDien.tenDaiDien}</Text>
                    <Text style={cardStyles.cardText}>
                        Địa chỉ trụ sở: {`${data?.diaChi}, ${data?.xa}, ${data?.huyen}, ${data?.thanhPho}`}
                    </Text>
                </View>
            </View>
            <Seperator style={{ marginVertical: 12, marginHorizontal: 0 }} />
            <View style={cardStyles.cardBottom}>
                <Text style={cardStyles.cardBottomTitle}>Thông tin chi tiết</Text>
                <Text>Tên tiếng Anh: {data.tenTiengAnh}</Text>
                <Text>Ngày hoạt động: {moment(data.ngayLap).format('DD/MM/YYYY')}</Text>
                <Text>Ngành nghề kinh doanh chính: {data.loaiHinh.tenLoaiHinh}</Text>
                <Text style={cardStyles.cardBottomTitle}>Giới thiệu</Text>
                <Text style={cardStyles.cardBottomText} numberOfLines={6}>{data.moTa}</Text>
            </View>
            <Button btnStyles={{ marginTop: 'auto' }} text='Xem chi tiết' onPress={() => { }} />
        </View>
    )
}

const DoanhNghiepPage = () => {
    const animationStyle = React.useCallback((value: number) => {
        'worklet'
        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
        const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25])
        const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0])

        return {
            transform: [{ scale }],
            zIndex,
            opacity,
        }
    }, [])
    const [data, setData] = useState<DoanhNghiep[]>([])

    useEffect(() => {
        ; (async () => {
            const data = await getDoanhNghieps()
            setData(data)
        })()
    }, [])
    return (
        <>
            <StatusBar style='light' />
            <View style={cardStyles.container}>
                <SafeAreaView style={topStyles.topContainer}>
                    <ThongKeCDSPieChart backgroundColor='#0a013a' />
                </SafeAreaView>
                <View style={carouselStyle.container}>
                    <Carousel
                        autoPlay
                        autoPlayInterval={5000}
                        style={{
                            width: windowWidth,
                            height: 500,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        width={windowWidth}
                        data={data}
                        renderItem={({ item, index }) => {
                            return <CardItem key={index} data={item} />
                        }}
                        customAnimation={animationStyle}
                    />
                </View>
            </View>
        </>
    )
}

export default DoanhNghiepPage

const topStyles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: '#0a013a',

    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    }
})

const carouselStyle = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'white',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        transform: [
            { translateY: -20 }
        ],
        overflow: 'hidden',
    }
})

const cardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    cardContainer: {
        padding: 16,
        width: '100%',
        height: '100%',

    },
    cardTop: {
        flexDirection: 'row',
        gap: 16,
    },
    cardImage: {
        borderRadius: 50,
        width: 75,
        height: 75,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.textGray,
        resizeMode: 'cover',
    },
    cardInfo: {
        gap: 4,
        flexShrink: 1,
    },
    cardTitle: {
        fontWeight: '500',
        fontSize: 16,
    },
    cardText: {
        fontSize: 12,
        flexShrink: 1,
        lineHeight: 18,
    },
    cardBottom: {
        gap: 6,
    },
    cardBottomTitle: {
        textTransform: 'uppercase',
        marginTop: 8,
        fontWeight: '500',
        fontSize: 15,
    },
    cardBottomText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'justify',
    },
})
