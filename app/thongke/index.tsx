import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundImage from '@components/View/BackgroundImage'
import PageHeader from '@components/View/PageHeader'
import { appImages } from '@constants/Images'
import { Stack } from 'expo-router'
import Colors from '@constants/Colors'
import BieuDos from '@components/ThongKe/Tabs/BieuDos'
import ChiTiet from '@components/ThongKe/Tabs/ChiTiet'
import TopTabs, { FilterTypes } from '@components/ThongKe/TopTabs'

const ThongKePage = () => {
    const [filter, setFilter] = useState(FilterTypes.BIEUDO)

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='transparent' />

            {/* Top */}
            <View>
                <BackgroundImage blurRadius={7} source={appImages.thongke_bg} />
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Thống kê dữ liệu</Text>
                </View>
            </View>

            {/* Filter */}
            <TopTabs onChangeValue={setFilter} />

            {filter === FilterTypes.BIEUDO && <BieuDos />}
            {filter === FilterTypes.CHITIET && <ChiTiet />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        paddingHorizontal: 14,
        marginTop: 24,
        marginBottom: 12,
        textAlign: 'left',
        width: '100%',
    },
    countRow: {
        marginHorizontal: 24,
    },
    countItem: {
        alignItems: 'center',
    },
    countNumber: {
        fontSize: 24,
        fontFamily: 'mon-b',
    },
    countText: {},
})

const topStyles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 24,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 4 },
    },
})

export default ThongKePage
