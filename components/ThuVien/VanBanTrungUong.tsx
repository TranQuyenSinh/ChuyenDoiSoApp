import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getThuViens } from '@services/commonServices'
import Loading from '@components/StatusPage/Loading'
import { ThuVien } from '@constants/TinTuc/ThuVienTypes'
import { useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
import PageHeader from '@components/View/PageHeader'
import { ScrollView } from 'react-native-gesture-handler'
import { SceneMap, TabView } from 'react-native-tab-view'

const VanBanTrungUong = () => {
    const [data, setData] = useState<ThuVien[]>([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const data = await getThuViens(0)
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <View>
            <Text>VanBanTrungUong</Text>
        </View>
    )
}

export default VanBanTrungUong

const styles = StyleSheet.create({})
