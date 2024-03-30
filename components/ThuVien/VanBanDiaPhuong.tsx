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
import Pdf from 'react-native-pdf'
import { windowHeight, windowWidth } from '@utils/window'
const VanBanDiaPhuong = () => {
    const [data, setData] = useState<ThuVien[]>([])
    const [loading, setLoading] = useState(false)
    const PdfResource = { uri: 'https://thongtin.cdsdnag.com/assets/frontend/file/20240326105729.pdf', cache: true }

    const fetchData = async () => {
        setLoading(true)
        const data = await getThuViens(1)
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) return <Loading />
    return (
        <View>
            <Text>VanBanDiaPhuong</Text>
            <Pdf trustAllCerts={false} source={PdfResource} style={styles.pdf} />
        </View>
    )
}

export default VanBanDiaPhuong

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
})
