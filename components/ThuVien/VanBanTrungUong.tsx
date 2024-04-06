import React, { useState, useEffect } from 'react'

import moment from 'moment'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, Pressable, StyleSheet } from 'react-native'

import { getThuViens } from '@services/commonServices'
import { ThuVien } from '@constants/TinTuc/ThuVienTypes'
import Loading from '@components/StatusPage/Loading'

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

    if (loading || !data) return <Loading />
    return (
        <ScrollView style={styles.container}>
            {data?.map(item => (
                <Pressable
                    onPress={() => router.push(`/thuvien/${item.id}`)}
                    android_ripple={{ color: 'grey' }}
                    style={styles.itemContainer}
                    key={item.id}>
                    <Text style={styles.tieuDe}>
                        (<Text>{moment(item.namPhatHanh).toDate().toLocaleDateString()}</Text>) {item.tieuDe}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    )
}

export default VanBanTrungUong

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    itemContainer: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    tieuDe: {
        lineHeight: 20,
        fontSize: 15,
        // fontWeight: '500',
        textAlign: 'justify',
    },
})
