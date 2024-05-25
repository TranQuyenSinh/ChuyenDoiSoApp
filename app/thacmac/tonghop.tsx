import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ThacMac } from '@constants/CommonTypes/ThacMacType'
import { getAllThacMac } from '@services/thacMacServices'
import { stackOptions } from '@configs/ScreenConfig'
import { router, Stack } from 'expo-router'
import RowComponent from '@components/View/RowComponent'
import { thacMacActions } from '@redux/thacMac.slice'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { Text } from '@components/View/Text'
import Colors from '@constants/Colors'
import ImageComponent from '@components/View/ImageComponent'
import Filter, { FilterTypes } from '@components/ThacMac/Filter'
import AdminFilter from '@components/ThacMac/AdminFilter'

const TongHopThacMac = () => {
    const dispatch = useAppDispatch()
    const [thacMacsFiltered, setThacMacsFiltered] = useState<ThacMac[]>([])
    const [filter, setFilter] = useState<FilterTypes>()
    const [filterDate, setFilterDate] = useState({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
    })
    const { thacMacs } = useAppSelector(state => state.thacMac)

    const fetchData = async () => {
        const data = await getAllThacMac()
        dispatch(thacMacActions.setThacMacs(data))
    }
    useEffect(() => {
        fetchData()
    }, [])
    useLayoutEffect(() => {
        let filteredData = thacMacs
        if (filter) {
            filteredData = filteredData
                .filter(item => {
                    if (filter === FilterTypes.ALL) return true
                    return filter === FilterTypes.WAITING ? !item.ngayTraLoi : item.ngayTraLoi
                })
                .sort((a, b) => b.id - a.id)
        }
        filteredData = filteredData.filter(
            item => new Date(item.createdAt) >= filterDate.from && new Date(item.createdAt) <= filterDate.to
        )
        setThacMacsFiltered(filteredData)
    }, [filter, thacMacs, filterDate])

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Tổng hợp thắc mắc',
                    ...stackOptions,
                }}
            />
            <AdminFilter onChangeValue={setFilter} onChangeDate={(from, to) => setFilterDate({ from, to })} />
            <FlatList
                data={thacMacsFiltered}
                contentContainerStyle={{ paddingBottom: 100 }}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={fetchData}
                renderItem={({ item }) => (
                    <Pressable
                        android_ripple={{ color: 'gray' }}
                        onPress={() => {
                            dispatch(thacMacActions.setThacMac(item))
                            router.push(`/thacmac/${item.id}`)
                        }}
                        // onLongPress={() => handleDelete(item)}
                        style={[
                            itemStyles.container,
                            { backgroundColor: item.ngayTraLoi ? '#5cb85c31' : '#e3e3e330' },
                        ]}>
                        <RowComponent gap={10} align='center'>
                            <ImageComponent uri={item.user.image} size={40} radius={50} border />
                            <Text numberOfLines={2} style={itemStyles.state}>
                                {item.doanhNghiep?.tenTiengViet}
                            </Text>
                        </RowComponent>
                        <Text style={itemStyles.title}>
                            {item.noiDung.slice(0, 50)}
                            {item.noiDung?.length > 50 && '...'}
                        </Text>
                        <RowComponent justify='space-between'>
                            <Text style={itemStyles.date}>
                                {moment(item.createdAt).format('DD/MM/YYYY')} ({moment(item.createdAt).fromNow()})
                            </Text>
                            <Text color={item.ngayTraLoi ? 'green' : 'gray'}>
                                {item.ngayTraLoi ? 'Đã trả lời' : 'Đang xem xét'}
                            </Text>
                        </RowComponent>
                    </Pressable>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

const itemStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.textGray,
        gap: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    state: {
        fontSize: 14,
    },
    date: {
        fontSize: 14,
    },
})

export default TongHopThacMac
