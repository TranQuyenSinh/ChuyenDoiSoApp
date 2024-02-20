import { Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, Image, Pressable, ScrollView } from 'react-native'

import Colors from '@constants/Colors'
import Modal from '@components/View/Modal'
import Loading from '@components/StatusPage/Loading'
import TabPageHeader from '@components/View/TabPageHeader'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('screen')

const SurveyPage = () => {
    const userStore = useSelector(state => state.user)
    const { isLoggedIn } = userStore

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Đánh giá doanh nghiệp'} />
                {/* {loading && <Loading containerStyles={{ marginTop: 30, backgroundColor: 'transparent' }} />} */}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 150,
        backgroundColor: 'blue',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxTitle: {
        color: Colors.white,
        fontFamily: 'mon-sb',
        fontSize: 20,
        textShadowColor: '#000',
    },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    topImg: {
        position: 'absolute',
        top: 0,
        width,
        height: 140,
        resizeMode: 'cover',
    },
    topText: {
        fontSize: 24,
        paddingHorizontal: 16,
        textAlign: 'center',
        marginTop: 50,
        color: Colors.default,
    },
})

export default SurveyPage
