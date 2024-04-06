import { StyleSheet } from 'react-native'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Accordion from '@components/View/Accordion'
import TabPageHeader from '@components/View/TabPageHeader'
import { useEffect, useState } from 'react'
import { getDanhSachHiepHoi } from '@services/hiepHoiServices'
import Loading from '@components/StatusPage/Loading'
import HiepHoiAccordion from '@components/HiepHoiInfo/HiepHoiAccordion'
import Colors from '@constants/Colors'

const AssociationPage = () => {
    const [loading, setLoading] = useState(false)
    const [hiepHois, setHiepHois] = useState([])

    const fetchData = async () => {
        setLoading(true)
        const data = await getDanhSachHiepHoi()
        setHiepHois(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            {!loading && (
                <ScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ gap: 6, paddingBottom: 16 }}
                    showsHorizontalScrollIndicator={false}>
                    {hiepHois && hiepHois?.map(item => <HiepHoiAccordion key={item.id} hiepHoiItem={item} />)}
                </ScrollView>
            )}
        </View>
    )
}

export default AssociationPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
})
