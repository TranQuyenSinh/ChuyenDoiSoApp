import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'

import { useRouter, useNavigation } from 'expo-router'
import StarRating from 'react-native-star-rating-widget'
import { Row, Table } from 'react-native-table-component'
import {
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import background from '@assets/images/phieu1_bg.jpg'
import { textStyles, defaultStyles } from '@constants/Styles'
import { themDanhGia, layPhieuDanhGia1 } from '@services/phieu1Services'

const { width, height } = Dimensions.get('screen')
const PhieuDanhGia1 = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const scrollRef = useRef(null)

    const [dataIndex, setDataIndex] = useState(0)
    const [data, setData] = useState([])
    const [scores, setScores] = useState([])
    const [isUnComplete, setIsUnComplete] = useState(true)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const { tieuchi, scores } = await layPhieuDanhGia1()
        setData(tieuchi)
        setScores(scores)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: false,
        })
    }, [dataIndex])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [])

    useEffect(() => {
        const event = navigation.addListener('beforeRemove', e => {
            if (!isUnComplete) {
                return
            }
            e.preventDefault()

            Alert.alert(
                'Xác nhận thoát đánh giá?',
                'Kết quả đánh giá của bạn chưa được lưu, xác nhận thoát đánh giá?',
                [
                    {
                        text: 'Thoát',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                    { text: 'Tiếp tục đánh giá', style: 'cancel', onPress: () => {} },
                ]
            )
        })
        return event
    }, [navigation, isUnComplete])

    const setScore = (score, id) => {
        const newScores = scores.map(item => {
            if (item.id === id) {
                item.score = score
            }
            return item
        })
        setScores(newScores)
    }

    const handleHoanThanhDanhGia = async () => {
        setIsUnComplete(false)
        await themDanhGia(scores)
    }
    return (
        <View style={defaultStyles.container}>
            <Image source={background} style={styles.background} />

            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={Colors.default} size={'large'} />
                </View>
            )}
            {!loading && (
                <>
                    {/* Top */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            marginTop: 30,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}>
                            <Ionicons name='close-outline' size={24} color={Colors.bodyText} />
                        </TouchableOpacity>
                        <Text style={textStyles.medium}>Phiếu đánh giá 1</Text>
                        <TouchableOpacity onPress={handleHoanThanhDanhGia} style={styles.topBtn}>
                            <>
                                <Ionicons name='checkmark-outline' size={30} color={Colors.white} />
                                <Text style={[textStyles.small, { color: Colors.white }]}>Hoàn thành</Text>
                            </>
                        </TouchableOpacity>
                    </View>
                    {/* End Top */}
                    {/* Main */}
                    <ScrollView
                        ref={scrollRef}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 20 }}
                        contentContainerStyle={{ paddingBottom: 50 }}>
                        {data?.length > 0 && (
                            <Table>
                                <Row
                                    flexArr={[1, 4]}
                                    data={['Trụ cột', `${data[dataIndex].stt}. ${data[dataIndex].noiDung}`]}
                                    style={styles.tcc1Row}
                                    textStyle={styles.rowHeadText}
                                />
                                {data[dataIndex]?.tieuChiCons?.map(tcc2 => (
                                    <View key={tcc2.id}>
                                        <Row
                                            key={tcc2.id}
                                            data={[`${tcc2.stt}. ${tcc2.noiDung}`]}
                                            style={styles.tcc2Row}
                                            textStyle={styles.rowText}
                                        />
                                        {tcc2?.tieuChiCons?.map(tcc0 => (
                                            <View key={tcc0.id}>
                                                {/* Cấp 0 */}
                                                <Row
                                                    key={tcc0.id}
                                                    data={[tcc0.noiDung]}
                                                    style={styles.tcc0Row}
                                                    textStyle={styles.rowText}
                                                />
                                                {/* Cấp 3 */}
                                                {tcc0?.tieuChiCons?.map(tcc3 => (
                                                    <View key={tcc3.id}>
                                                        <Row
                                                            key={tcc3.id}
                                                            data={[`${tcc3.stt}. ${tcc3.noiDung}`]}
                                                            style={styles.tcc3Row}
                                                            textStyle={styles.rowText}
                                                        />
                                                        {tcc3?.cauHois?.map(ch => (
                                                            <Row
                                                                key={ch.id}
                                                                data={[ch.noiDung]}
                                                                style={styles.cauHoiRow}
                                                                textStyle={styles.rowText}
                                                            />
                                                        ))}
                                                        <View style={styles.danhGiaContainer}>
                                                            <Text>Đánh giá:</Text>

                                                            <StarRating
                                                                rating={scores.find(s => s.id === tcc3.id)?.score}
                                                                onChange={s => setScore(s, tcc3.id)}
                                                                enableHalfStar={false}
                                                                color={Colors.default}
                                                                animationConfig={{
                                                                    delay: 0,
                                                                    scale: 1,
                                                                    duration: 0,
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </Table>
                        )}
                    </ScrollView>
                    {/* End Main */}
                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        {dataIndex > 0 && (
                            <TouchableOpacity
                                onPress={() => (dataIndex > 0 ? setDataIndex(dataIndex - 1) : undefined)}
                                style={styles.footerBtn}>
                                <Ionicons name='arrow-back-outline' size={24} color={Colors.white} />
                                <Text style={styles.footerBtnText}>Trước</Text>
                            </TouchableOpacity>
                        )}
                        <View></View>
                        {dataIndex < data.length - 1 && (
                            <TouchableOpacity
                                onPress={() => (dataIndex < data?.length - 1 ? setDataIndex(dataIndex + 1) : undefined)}
                                style={styles.footerBtn}>
                                <Text style={styles.footerBtnText}>Tiếp</Text>
                                <Ionicons name='arrow-forward-outline' size={24} color={Colors.white} />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* End Footer */}
                </>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        height,
        width,
        resizeMode: 'cover',
    },
    topBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: Colors.success,
        elevation: 8,
        paddingHorizontal: 8,
        borderRadius: 16,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 16,
        backgroundColor: Colors.lightGrey,
        elevation: 16,
        borderWidth: 1,
        borderColor: '#8b8b8b',
    },
    footerBtn: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        backgroundColor: Colors.default,
        color: Colors.white,
        paddingHorizontal: 16,
        borderRadius: 16,
        paddingVertical: 6,
    },
    footerBtnText: {
        fontFamily: 'mon-sb',
        color: Colors.white,
    },
    rowHeadText: {
        margin: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    rowText: {
        margin: 8,
        lineHeight: 25,
    },
    tcc1Row: {
        backgroundColor: '#f8c2ea',
        borderColor: '#f8c2ea',
        borderWidth: 1,
    },
    tcc2Row: {
        backgroundColor: 'lightgreen',
        borderColor: 'lightgreen',
        borderWidth: 1,
    },
    tcc0Row: {
        backgroundColor: '#fcfcb0',
        borderColor: '#fcfcb0',
        borderWidth: 1,
    },
    tcc3Row: {
        backgroundColor: '#9bdbf2',
        borderColor: '#9bdbf2',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    cauHoiRow: {
        backgroundColor: '#ffffff',
        borderColor: '#000',
        borderWidth: 1,
    },
    danhGiaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        gap: 6,
        backgroundColor: Colors.white,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
})

export default PhieuDanhGia1
