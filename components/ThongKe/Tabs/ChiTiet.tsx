import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghiepPage, getDoanhNghieps } from '@services/doanhNghiepServices'
import TopTabs, { FilterTypes } from '../TopTabs'
import Filter from '../Filter'
import { set } from 'lodash'
import DoanhNghiepItem from '../DoanhNghiepItem'
import { array } from 'yup'
import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import RowComponent from '@components/View/RowComponent'
import Colors from '@constants/Colors'

const ChiTiet = () => {
    const [doanhNghieps, setDoanhNghieps] = useState<DoanhNghiep[]>([])
    const [filteredDoanhNghieps, setFilteredDoanhNghieps] = useState<DoanhNghiep[]>([])
    const [count, setCount] = useState({
        count: 0,
        member: 0,
    })
    const [isEnd, setIsEnd] = useState(false)
    const [filter, setFilter] = useState<any>({
        linhVucId: undefined,
        loaiHinhId: undefined,
        huyen: undefined,
    })

    const fetchData = async () => {
        const { loaiHinhId, huyen } = filter
        const data = await getDoanhNghiepPage(doanhNghieps.length, 50, loaiHinhId, huyen)
        if (!data || data.data.length === 0) {
            setIsEnd(true)
            return
        }
        setDoanhNghieps(data.data)
        setCount({ count: data.total, member: data.member })
    }

    const fetchMoreData = async () => {
        if (isEnd) return
        const { loaiHinhId, huyen } = filter
        const data = await getDoanhNghiepPage(doanhNghieps.length, 50, loaiHinhId, huyen)
        setCount({ count: data?.total || 0, member: data?.member || 0 })
        if (!data || data.data.length === 0) {
            setIsEnd(true)
            return
        }
        setDoanhNghieps(doanhNghieps.concat(data.data))
    }

    const onFilterChange = async (loaiHinhId?: number, huyen?: number) => {
        setDoanhNghieps([])
        setIsEnd(false)
        setFilter({ loaiHinhId: loaiHinhId, huyen: huyen })
    }

    useEffect(() => {
        fetchData()
    }, [filter])

    useEffect(() => {
        let filteredData = doanhNghieps
        setFilteredDoanhNghieps(filteredData)
    }, [doanhNghieps])

    return (
        <View style={styles.container}>
            <Filter onChange={onFilterChange} />
            <RowComponent styles={{ paddingVertical: 12 }} align='center' justify='center'>
                <View style={styles.divider} />
                <Text>
                    Tổng: {count.count} doanh nghiệp ({count.member} hội viên)
                </Text>
                <View style={styles.divider} />
            </RowComponent>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredDoanhNghieps}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={({ item }) => <DoanhNghiepItem doanhNghiep={item} />}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => (
                        <RowComponent styles={{ paddingBottom: 50 }} align='center' justify='center'>
                            {!isEnd && <ActivityIndicator size={'large'} color={Colors.default} />}
                        </RowComponent>
                    )}
                    onEndReached={() => {
                        fetchMoreData()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        marginHorizontal: 12,
        flex: 1,
        borderBottomColor: Colors.bodyText,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

export default ChiTiet
