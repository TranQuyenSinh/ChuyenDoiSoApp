import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
import PageHeader from '@components/View/PageHeader'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import moment from '@utils/moment'
import survey1_bg from '@assets/images/survey1.png'
import survey2_bg from '@assets/images/survey2.png'
import survey3_bg from '@assets/images/survey3.png'
import survey4_bg from '@assets/images/survey4.png'

const ChiTietKhaoSat = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <PageHeader title={'Chi tiết khảo sát'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 12 }}
                contentContainerStyle={{ gap: 12, paddingBottom: 16, paddingTop: 8 }}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>
                        Mã khảo sát: <Text style={styles.infoText}>#{id}</Text>
                    </Text>
                    <Text style={styles.infoTitle}>
                        Ngày tạo:{' '}
                        <Text style={[styles.infoText, { textTransform: 'capitalize' }]}>
                            {moment(new Date()).format('dddd, HH:mm, DD/MM/YYYY')}
                        </Text>
                    </Text>
                    <Text style={styles.infoTitle}>
                        Tổng điểm: <Text style={styles.infoText}>240</Text>
                    </Text>
                </View>
                <Text style={styles.title}>Mức độ chuyển đổi số</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>
                        Mức độ: <Text style={styles.infoText}>Mức 3 - Hình thành</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Các hoạt động chuyển đổi số trong doanh nghiệp đã cơ bản hình thành theo các trụ cột ở các bộ
                        phận, mang lại lợi ích và hiệu quả thiết thực cho doanh nghiệp cũng như trải nghiệm của khách
                        hàng. Khi đạt được mức này là đang bắt đầu hình thành doanh nghiệp số.
                    </Text>
                </View>
                <Text style={styles.title}>Phiếu đánh giá</Text>
                <Pressable>
                    <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#a8c0ff', '#6b53d6']} style={styles.box}>
                        <Text style={styles.boxTitle}>Phiếu đánh giá 1</Text>
                        <View style={styles.phieuContainer}>
                            <Image source={survey1_bg} style={styles.phieuImg} />
                            <View style={styles.phieuInfoContainer}>
                                <Text style={styles.phieuTitle}>
                                    Điểm: <Text style={styles.phieuText}>100</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Hoàn thành: <Text style={styles.phieuText}>10/36</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Tạo lúc:{`\n`}
                                    <Text style={styles.phieuText}>
                                        {moment(new Date()).format('HH:mm, DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
                <Pressable>
                    <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#11998e', '#38ef7d']} style={[styles.box]}>
                        <Text style={styles.boxTitle}>Phiếu đánh giá 2</Text>
                        <View style={styles.phieuContainer}>
                            <Image source={survey2_bg} style={styles.phieuImg} />
                            <View style={styles.phieuInfoContainer}>
                                <Text style={styles.phieuTitle}>
                                    Điểm: <Text style={styles.phieuText}>100</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Hoàn thành: <Text style={styles.phieuText}>10/36</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Tạo lúc:{`\n`}
                                    <Text style={styles.phieuText}>
                                        {moment(new Date()).format('HH:mm, DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
                <Pressable>
                    <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#FC5C7D', '#6A82FB']} style={[styles.box]}>
                        <Text style={styles.boxTitle}>Phiếu đánh giá 3</Text>
                        <View style={styles.phieuContainer}>
                            <Image source={survey3_bg} style={styles.phieuImg} />
                            <View style={styles.phieuInfoContainer}>
                                <Text style={styles.phieuTitle}>
                                    Điểm: <Text style={styles.phieuText}>100</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Hoàn thành: <Text style={styles.phieuText}>10/36</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Tạo lúc:{`\n`}
                                    <Text style={styles.phieuText}>
                                        {moment(new Date()).format('HH:mm, DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
                <Pressable>
                    <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#fc4a1a', '#f7b733']} style={[styles.box]}>
                        <Text style={styles.boxTitle}>Phiếu đánh giá 4</Text>
                        <View style={styles.phieuContainer}>
                            <Image source={survey4_bg} style={styles.phieuImg} />
                            <View style={styles.phieuInfoContainer}>
                                <Text style={styles.phieuTitle}>
                                    Điểm: <Text style={styles.phieuText}>100</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Hoàn thành: <Text style={styles.phieuText}>10/36</Text>
                                </Text>
                                <Text style={styles.phieuTitle}>
                                    Tạo lúc:{`\n`}
                                    <Text style={styles.phieuText}>
                                        {moment(new Date()).format('HH:mm, DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default ChiTietKhaoSat

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.default,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginTop: 12,
    },
    infoContainer: {
        borderRadius: 6,
        padding: 16,
        gap: 6,
        backgroundColor: Colors.white,
        elevation: 6,
        marginHorizontal: 16,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'justify',
        lineHeight: 20,
    },
    box: {
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    boxTitle: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: 'bold',
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
    },
    phieuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
    },
    phieuImg: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
    phieuInfoContainer: {
        gap: 4,
        overflow: 'hidden',
        flexShrink: 1,
    },
    phieuTitle: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
    },
    phieuText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'normal',
    },
})
