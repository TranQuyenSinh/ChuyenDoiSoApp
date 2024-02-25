import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, Pressable, ScrollView } from 'react-native'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TabPageHeader from '@components/View/TabPageHeader'
import RequireLogin from '@components/StatusPage/RequireLogin'

const SurveyPage = () => {
    const { isLoggedIn } = useSelector(state => state.user)
    const router = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Danh sách khảo sát'} />
                {!isLoggedIn && <RequireLogin message='Vui lòng đăng nhập để sử dụng chức năng này' />}
                {/* {loading && <Loading containerStyles={{ marginTop: 30, backgroundColor: 'transparent' }} />} */}

                {isLoggedIn && (
                    <>
                        <Pressable onPress={() => router.push('survey/1')} style={styles.itemContainer}>
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
                )}
            </ScrollView>
        </SafeAreaView>
        // <View style={styles.container}>
        //     <View style={{ height: 150 }}>
        //         <Image style={styles.topImg} source={top_bg} />
        //         <Text style={[textStyles.large, styles.topText]}>Đánh giá mức độ chuyển đổi số doanh nghiệp</Text>
        //     </View>
        //     {isLoggedIn && (
        //         <ScrollView
        //             showsVerticalScrollIndicator={false}
        //             contentContainerStyle={{ gap: 16 }}
        //             style={{ paddingHorizontal: 16 }}>
        //             <Pressable onPress={() => router.push('danhgia/phieu1')}>
        //                 <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#a8c0ff', '#6b53d6']} style={styles.box}>
        //                     <Text style={styles.boxTitle}>Phiếu đánh giá 1</Text>
        //                 </LinearGradient>
        //             </Pressable>
        //             <Pressable onPress={() => router.push('danhgia/phieu1')}>
        //                 <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#11998e', '#38ef7d']} style={[styles.box]}>
        //                     <Text style={styles.boxTitle}>Phiếu đánh giá 2</Text>
        //                 </LinearGradient>
        //             </Pressable>
        //             <Pressable onPress={() => router.push('danhgia/phieu1')}>
        //                 <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#FC5C7D', '#6A82FB']} style={[styles.box]}>
        //                     <Text style={styles.boxTitle}>Phiếu đánh giá 3</Text>
        //                 </LinearGradient>
        //             </Pressable>
        //             <Pressable onPress={() => router.push('danhgia/phieu1')}>
        //                 <LinearGradient start={{ x: 0, y: 0.2 }} colors={['#fc4a1a', '#f7b733']} style={[styles.box]}>
        //                     <Text style={styles.boxTitle}>Phiếu đánh giá 4</Text>
        //                 </LinearGradient>
        //             </Pressable>
        //         </ScrollView>
        //     )}
        //     {!isLoggedIn && <RequireLogin message='Vui lòng đăng nhập trước khi thực hiện đánh giá' />}
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    itemContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginHorizontal: 16,
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        elevation: 6,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: Colors.textGray,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default SurveyPage
