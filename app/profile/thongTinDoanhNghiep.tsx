import { useState, useLayoutEffect, useEffect } from 'react'

import { StyleSheet, View } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import Colors from '@constants/Colors'
import { windowWidth } from '@utils/window'
import DoanhNghiepInfo from '@components/DoanhNghiepInfo/doanhNghiepInfo'
import NguoiDaiDienInfo from '@components/DoanhNghiepInfo/nguoiDaiDienInfo'
import { useDispatch } from 'react-redux'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import { AppDispatch } from '@redux/store'
import IconButton from '@components/View/IconButton'
import { MaterialIcons } from '@expo/vector-icons'

const tabViewData = [
    { key: 'dn', title: 'Hồ sơ doanh nghiệp' },
    { key: 'dd', title: 'Đại diện doanh nghiệp' },
]

const ThongTinDoanhNghiep = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const [index, setIndex] = useState(0)

    useEffect(() => {
        dispatch(fetchDoanhNghiepInfo())
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Thông tin doanh nghiệp',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerRight: () => {
                return (
                    <IconButton
                        onPress={() => router.push(index === 0 ? '/doanhnghiep/edit' : '/doanhnghiep/editDaiDien')}>
                        <MaterialIcons name='edit' size={24} color='white' />
                    </IconButton>
                )
            },
            headerTintColor: 'white',
        })
    }, [navigation, index])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
