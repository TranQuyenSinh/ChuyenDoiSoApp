import React, { useState, useLayoutEffect } from 'react'

import { useNavigation } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import Colors from '@constants/Colors'
import { screenWidth } from '@utils/window'
import PageHeader from '@components/View/PageHeader'
import VanBanTrungUong from '@components/ThuVien/VanBanTrungUong'
import VanBanDiaPhuong from '@components/ThuVien/VanBanDiaPhuong'

const ThuVienPage = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'diaphuong', title: 'Văn bản địa phương' },
        { key: 'trunguong', title: 'Văn bản trung ương' },
    ])
    const renderScene = SceneMap({
        diaphuong: VanBanDiaPhuong,
        trunguong: VanBanTrungUong,
    })

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [])

    return (
        <View style={styles.container}>
            <PageHeader title={'Văn bản chuyển đổi số'} />
            <TabView
                style={styles.container}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                swipeEnabled={true}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                        labelStyle={styles.labelStyle}
                        activeColor={Colors.default}
                        style={styles.tabContainerStyle}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: screenWidth }}
            />
        </View>
    )
}
export default ThuVienPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabContainerStyle: {
        backgroundColor: Colors.white,
        elevation: 0,
        height: 45,
        marginBottom: 8,
        marginTop: 12,
    },
    indicatorStyle: {
        backgroundColor: Colors.default,
        height: 3,
        borderRadius: 20,
    },
    labelStyle: {
        textTransform: 'none',
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
        height: '100%',
    },
})
