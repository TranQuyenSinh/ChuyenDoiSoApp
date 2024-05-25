import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Filter, { FilterProps } from './Filter'
import RowComponent from '@components/View/RowComponent'
import useToggle from '@hooks/useToggle'
import DatePicker from 'react-native-date-picker'
import Colors from '@constants/Colors'
import moment from 'moment'
import { timKiemDNTuVan } from '@services/hoiDapServices'
import { Ionicons } from '@expo/vector-icons'

interface AdminFilterProps extends FilterProps {
    onChangeDate: (from: Date, to: Date) => void
}

const AdminFilter = (props: AdminFilterProps) => {
    const { onChangeValue, onChangeDate } = props
    const { isOpen: isOpenFrom, toggle: toggleFrom } = useToggle()
    const { isOpen: isOpenTo, toggle: toggleTo } = useToggle()
    const [date, setDate] = useState({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
    })

    useEffect(() => {
        onChangeDate?.(date.from, date.to)
    }, [date])

    return (
        <View style={styles.container}>
            <Filter onChangeValue={onChangeValue} />
            <RowComponent styles={{ paddingHorizontal: 4 }} align='center' justify='space-evenly'>
                <Pressable style={styles.timeItem} onPress={() => toggleFrom(true)}>
                    <Text style={styles.timeText}>{moment(date.from).format('DD/MM/YYYY')}</Text>
                </Pressable>
                <Ionicons name='arrow-forward' size={24} color={Colors.default} />
                <Pressable style={styles.timeItem} onPress={() => toggleTo(true)}>
                    <Text style={styles.timeText}>{moment(date.to).format('DD/MM/YYYY')}</Text>
                </Pressable>
            </RowComponent>
            <DatePicker
                modal
                mode='date'
                open={isOpenFrom}
                date={date.from}
                dividerColor={Colors.default}
                locale='vi-VN'
                cancelText='Hủy'
                confirmText='Xác nhận'
                title='Từ ngày'
                theme='light'
                onConfirm={data => {
                    toggleFrom(false)
                    setDate({ ...date, from: data })
                }}
                onCancel={() => {
                    toggleFrom(false)
                }}
            />
            <DatePicker
                modal
                mode='date'
                open={isOpenTo}
                date={date.to}
                dividerColor={Colors.default}
                locale='vi-VN'
                cancelText='Hủy'
                confirmText='Xác nhận'
                title='Đến ngày'
                theme='light'
                onConfirm={data => {
                    toggleTo(false)
                    setDate({ ...date, to: data })
                }}
                onCancel={() => {
                    toggleTo(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    timeItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.default,
        margin: 5,
    },
    timeText: {
        color: Colors.default,
        fontSize: 16,
    },
})

export default AdminFilter
