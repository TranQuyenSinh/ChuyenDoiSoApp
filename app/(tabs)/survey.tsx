import { Href, Link, useRouter } from 'expo-router'
import { Image, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, Pressable, ScrollView } from 'react-native'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TabPageHeader from '@components/View/TabPageHeader'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { defaultStyles, textStyles } from '@constants/Styles'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '@redux/store'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import Seperator from '@components/View/Seperator'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '@components/StatusPage/Loading'

const SurveyPage = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { doanhNghiep } = useSelector((state: RootState) => state.doanhNghiep)

    const fetchKhaoSat = async () => {}

    useEffect(() => {
        dispatch(fetchDoanhNghiepInfo())
    }, [])

    if (!isLoggedIn) {
        return <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />
    }

    if (false) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Khảo sát doanh nghiệp'} />
                <Text style={[textStyles.medium, { paddingHorizontal: 16, marginTop: 6 }]}>
                    {doanhNghiep?.tenTiengViet}
                </Text>
                <Seperator />

                <View style={styles.boxsContainer}>
                    <Pressable style={{ flex: 6 }} onPress={() => router.push('/danhgia/phieu1')}>
                        <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#4ee9f2', '#4ba0fa']} style={[styles.box]}>
                            <Text style={styles.boxTitle}>Mức độ CDS</Text>
                            <Text style={styles.boxNumber}>Mức 2 - Hình thành</Text>
                            <Text style={styles.boxSub}>Xem chi tiết {'>'}</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable style={{ flex: 4 }} onPress={() => router.push('/danhgia/phieu1')}>
                        <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#38ef7d', '#15b175']} style={[styles.box]}>
                            <Text style={styles.boxTitle}>Đã thực hiện</Text>
                            <Text style={styles.boxNumber}>2 khảo sát</Text>
                            <Text style={styles.boxSub}>Xem chi tiết {'>'}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                <Text style={styles.title}>Mô hình đề xuất hiện tại</Text>
                <View style={styles.sectionContainer}>
                    <View style={styles.mohinhImageContainer}>
                        <Image
                            source={{
                                uri: 'http://192.168.1.9:8000/assets/backend/img/tintuc/Giai-phap-chuyen-doi-so-cho-cac-doanh-nghiep-vua-va-lon-nganh-Cong-nghiep-san-xuat.jpg?62592',
                            }}
                            style={styles.mohinhImage}
                        />
                        <View style={styles.imageOverlay}>
                            <Text style={styles.mohinhTen}>Giảm chi phí tìm kiếm và chi phí cơ hội</Text>
                        </View>
                    </View>
                    <View style={styles.mohinhInfoContainer}>
                        <Text style={textStyles.longText}>
                            Là mô hình kích hoạt sự xuất hiện của bên trung gian – nhóm người chuyên tổng hợp, xử lý,
                            sắp xếp lượng thông tin phức tạp sau đó cung cấp cho người dùng theo định dạng họ mong muốn.
                            Doanh nghiệp muốn áp dụng mô hình này phải đáp ứng được yêu cầu về mặt chuyên môn, đồng thời
                            đảm bảo được tính khách quan và tin cậy. Từ đó giúp người dùng dễ dàng
                        </Text>
                    </View>
                </View>

                <Text style={styles.title}>Ý kiến chuyên gia</Text>
                <View style={[styles.sectionContainer, { padding: 12 }]}>
                    {true && (
                        <>
                            {/* Chuyên gia Info */}
                            <Pressable
                                onPress={() => router.push(`/chuyengia/1`)}
                                style={styles.chuyengiaInfoContainer}>
                                <Image
                                    source={{ uri: 'http://192.168.1.9:8000/assets/backend/img/hoso/avatar-86.jpeg' }}
                                    style={styles.chuyengiaAvatar}
                                />
                                <View>
                                    <Text style={styles.chuyengiaTen}>Chuyên gia Nguyễn Việt Long</Text>
                                    <Text>{moment(new Date(2024, 1, 15)).fromNow()}</Text>
                                </View>
                            </Pressable>
                            <Seperator style={{ marginHorizontal: 0, marginBottom: 0 }} />
                            {/* Đánh giá & đề xuất của chuyên gia */}
                            <View>
                                <Text style={styles.chuyengiaTitle}>Đánh giá:</Text>
                                <Text style={textStyles.longText}>Mô hình đề xuất hiện tại rất tốt</Text>
                                <Text style={styles.chuyengiaTitle}>Đề xuất:</Text>
                                <Text style={textStyles.longText}>
                                    Giúp kích hoạt sự xuất hiện của bên trung gian – nhóm người chuyên tổng hợp, xử lý,
                                    sắp xếp lượng thông tin phức tạp sau đó cung cấp cho người dùng theo định dạng họ
                                    mong muốn.
                                </Text>
                            </View>
                        </>
                    )}

                    {false && (
                        <>
                            <Text style={[textStyles.medium, { textAlign: 'center' }]}>
                                Chưa có ý kiến chuyên gia...
                            </Text>
                        </>
                    )}
                </View>

                {/* {isLoggedIn && (
                    <>
                    <Pressable onPress={() => router.push('/survey/1')} style={styles.itemContainer}>
                    <View style={styles.itemInfo}>
                    <View style={{ flex: 1, gap: 6 }}>
                    <Text style={styles.title}>
                    Khảo sát: #<Text style={{ color: Colors.default }}>1</Text>
                                    </Text>
                                    <Text style={styles.date}>
                                        <Text style={{ textTransform: 'capitalize' }}>
                                            {moment(new Date()).format('dddd, HH:mm, DD/MM/YYYY')}
                                        </Text>
                                    </Text>
                                </View>
                                <Text style={styles.score}>256 điểm</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
                            </View>
                        </Pressable>
                    </>
                )} */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    title: {
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 6,
    },
    boxsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 6,
    },
    box: {
        borderRadius: 18,
        padding: 12,
    },
    boxTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
    boxNumber: {
        color: Colors.white,
        fontWeight: '800',
        fontSize: 20,
    },
    boxSub: {
        color: Colors.white,
        alignSelf: 'flex-end',
        marginTop: 6,
    },

    sectionContainer: {
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: Colors.white,
        elevation: 6,
        marginHorizontal: 16,
        marginBottom: 12,
    },

    mohinhImageContainer: {},
    imageOverlay: {
        backgroundColor: '#000000aa',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    mohinhImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 12,
    },
    mohinhTen: {
        color: Colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    mohinhInfoContainer: {
        backgroundColor: Colors.white,
        padding: 12,
    },

    chuyengiaInfoContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    chuyengiaAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    chuyengiaTen: {
        fontSize: 18,
        fontWeight: '500',
    },
    chuyengiaDate: {
        color: Colors.textGray,
        fontSize: 16,
    },
    chuyengiaTitle: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 12,
    },
})

export default SurveyPage
