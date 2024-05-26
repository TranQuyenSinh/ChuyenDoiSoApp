import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from '@components/View/RowComponent'
import Colors from '@constants/Colors'

export enum FilterTypes {
    BIEUDO = 'Tổng quan',
    CHITIET = 'Chi tiết',
}

const FilterData = [FilterTypes.BIEUDO, FilterTypes.CHITIET]
export interface FilterProps {
    onChangeValue: (value: FilterTypes) => void
}

const TopTabs = (props: FilterProps) => {
    const { onChangeValue } = props
    const [index, setIndex] = useState(FilterTypes.BIEUDO)
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

export default TopTabs
