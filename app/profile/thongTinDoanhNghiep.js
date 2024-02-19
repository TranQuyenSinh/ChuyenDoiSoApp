import { useState, useLayoutEffect, useEffect } from 'react'

import { View, StyleSheet } from 'react-native'
import { useRouter, useNavigation } from 'expo-router'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import Colors from '@constants/Colors'
import { windowWidth } from '@utils/window'
import PageHeader from '@components/View/PageHeader'
import DoanhNghiepInfo from '@components/DoanhNghiepInfo/doanhNghiepInfo'
import NguoiDaiDienInfo from '@components/DoanhNghiepInfo/nguoiDaiDienInfo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'

const tabViewData = [
    { key: 'dn', title: 'Hồ sơ doanh nghiệp' },
    { key: 'dd', title: 'Đại diện doanh nghiệp' },
]

const ThongTinDoanhNghiep = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [index, setIndex] = useState(0)

    useEffect(() => {
        dispatch(fetchDoanhNghiepInfo())
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <PageHeader title={'Thông tin doanh nghiệp'} />
            <TabView
                style={styles.container}
                navigationState={{ index: index, routes: tabViewData }}
                renderScene={SceneMap({
                    dn: DoanhNghiepInfo,
                    dd: NguoiDaiDienInfo,
                })}
                swipeEnabled={true}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        pressColor='transparent'
                        indicatorStyle={styles.tabBarIndicator}
                        labelStyle={styles.tabBarLabel}
                        tabStyle={{ width: windowWidth / 2 }}
                        activeColor={Colors.default}
                        style={styles.tabBar}
                        scrollEnabled
                    />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: windowWidth }}
            />
        </View>
    )
}

export default ThongTinDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
        height: 45,
        width: '100%',
    },
    tabBarIndicator: {
        backgroundColor: Colors.default,
        height: 3,
        borderRadius: 20,
    },
    tabBarLabel: {
        textTransform: 'none',
        fontSize: 16,
        color: '#000',
    },
    tabBarLabelActive: {
        fontSize: 18,
    },
})
