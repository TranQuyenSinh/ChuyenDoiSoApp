import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from '@components/View/RowComponent'
import Colors from '@constants/Colors'

export enum FilterTypes {
    ALL = 'Tất cả',
    WAITING = 'Đang xem xét',
    ANSWERED = 'Đã trả lời',
}

const FilterData = [FilterTypes.ALL, FilterTypes.WAITING, FilterTypes.ANSWERED]
export interface FilterProps {
    onChangeValue: (value: FilterTypes) => void
}

const Filter = (props: FilterProps) => {
    const { onChangeValue } = props
    const [index, setIndex] = useState(FilterTypes.ALL)
    useEffect(() => {
        onChangeValue?.(index)
    }, [index])
    return (
        <RowComponent styles={styles.container}>
            {FilterData.map((item, i) => {
                return (
                    <Pressable
                        style={[styles.item, index === item && styles.itemActive]}
                        key={item}
                        onPress={() => setIndex(item)}>
                        <Text style={[styles.text, index === item && styles.textActive]}>{item}</Text>
                    </Pressable>
                )
            })}
        </RowComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    itemActive: {
        backgroundColor: '#ddf1fd',
        borderBottomWidth: 2,
        borderBottomColor: Colors.default,
    },
    text: {},
    textActive: {},
})

export default Filter
