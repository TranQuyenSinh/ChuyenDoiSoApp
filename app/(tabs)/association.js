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

const Page = () => {
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
        <SafeAreaView style={styles.container}>
            {loading && <Loading containerStyles={{ marginTop: 30, backgroundColor: 'transparent' }} />}
            {!loading && (
                <ScrollView
                    contentContainerStyle={{ gap: 6, paddingBottom: 16 }}
                    showsHorizontalScrollIndicator={false}>
                    <TabPageHeader title={'Hiệp hội doanh nghiệp'} />
                    {hiepHois && hiepHois?.map(item => <HiepHoiAccordion key={item.id} hiepHoiItem={item} />)}
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
})
