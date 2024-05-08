import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import Loading from '@components/StatusPage/Loading'
import { getChuyenGia } from '@services/chuyenGiaServices'
import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import Colors from '@constants/Colors'
import BackgroundImage from '@components/View/BackgroundImage'
//@ts-ignore
import background from '@assets/backgrounds/chuyengiadetail.jpg'
import Button from '@components/View/Button'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import CongTacTab from '@components/ChuyenGia/CongTacTab'
import HocTapTab from '@components/ChuyenGia/HocTapTab'
import KinhNghiemTab from '@components/ChuyenGia/KinhNghiemTab'
import { screenWidth } from '@utils/window'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { chuyenGiaActions } from '@redux/chuyenGiaSlice'
import GioiThieuTab from '@components/ChuyenGia/GioiThieuTab'
const ChuyenGiaDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { chuyenGia } = useSelector((state: RootState) => state.chuyenGia)
    const [loading, setLoading] = useState(false)
    // tab
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'gioiThieu', title: 'Giới thiệu' },
        { key: 'kinhNghiem', title: 'Kinh nghiệm tư vấn' },
        { key: 'congTac', title: 'Quá trình công tác' },
        { key: 'hocTap', title: 'Quá trình học tập' },
    ])
    const renderScene = SceneMap({
        gioiThieu: GioiThieuTab,
        kinhNghiem: KinhNghiemTab,
        hocTap: HocTapTab,
        congTac: CongTacTab,
    })
    const fetchChuyenGia = async (id: number) => {
        setLoading(true)
        const data = await getChuyenGia(id)
        dispatch(chuyenGiaActions.setChuyenGia(data))
        setLoading(false)
    }

    useEffect(() => {
        fetchChuyenGia(+id)
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading || !chuyenGia) {
        return <Loading />
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ height: 200 }}>
                <PageHeader tintColor='white' title={''} style={{ marginBottom: 12 }} />
                <BackgroundImage source={background} />
                <View style={styles.info}>
                    <Image source={chuyenGia?.hinhAnh ? { uri: chuyenGia.hinhAnh } : no_avatar} style={styles.image} />
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.ten}>
                                {chuyenGia.trinhDo}
                                {chuyenGia.trinhDo && ' '}
                                {chuyenGia.tenChuyenGia}
                            </Text>
                            {chuyenGia.chucVu && <Text style={styles.text}>{chuyenGia.chucVu}</Text>}
                            <Text style={styles.text}>Kinh nghiệm tư vấn: {chuyenGia.namKinhNghiem}</Text>
                            <Text style={styles.text}>Lĩnh vực tư vấn: {chuyenGia.linhVuc?.tenLinhVuc}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 1 }}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    btnStyles={[styles.button, { backgroundColor: Colors.success }]}
                                    text='Gọi điện'
                                    onPress={() => Linking.openURL(`tel:${chuyenGia.sdt}`)}
                                />
                                <Button
                                    btnStyles={[styles.button, { backgroundColor: Colors.orange }]}
                                    text='Nhắn tin'
                                    onPress={() => router.push(`/tuvan/${chuyenGia.user.id}`)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.section}>
                    <TabView
                        style={tabStyles.container}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        swipeEnabled={true}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                indicatorStyle={tabStyles.indicatorStyle}
                                labelStyle={tabStyles.labelStyle}
                                activeColor={'white'}
                                style={tabStyles.tabContainerStyle}
                                contentContainerStyle={{ alignItems: 'center' }}
                                scrollEnabled
                            />
                        )}
                        onIndexChange={setIndex}
                        initialLayout={{ width: screenWidth }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default ChuyenGiaDetail

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
        gap: 16,
        padding: 12,
        alignItems: 'center',
    },
    body: {
        marginTop: 75,
        flex: 1,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 6,
        marginHorizontal: 16,
        marginBottom: 12,
        minHeight: 500,
        overflow: 'hidden',
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 12,
    },
    button: {
        flex: 1,
        height: 30,
        borderRadius: 30,
    },
})

const tabStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    tabContainerStyle: {
        backgroundColor: Colors.default,
        elevation: 0,
        height: 35,
    },
    indicatorStyle: {
        backgroundColor: Colors.orange,
        height: 2,
        borderRadius: 20,
    },
    labelStyle: {
        textTransform: 'none',
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        height: '100%',
        minWidth: 200,
    },
})
