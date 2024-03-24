import React, { useMemo, useState, useEffect } from 'react'

import { Text, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

import { axios } from '@utils/axios'
import { screenWidth } from '@utils/window'

import { khaoSatStyles } from '../khaoSatStyles'

const ThongKeCDSPieChart = () => {
    const [data, setData] = useState<any[]>([])
    const colors = useMemo(() => ['#f53d3dc9', '#ffa600b9', '#f7f72db7', '#008000bf', '#0000ff7b', '#4c0082a4'], [])
    const fetchData = async () => {
        const { data } = await axios.get('thongke/mucdo')

        const result = []
        for (let key in data) {
            const item = {
                name: `Mức ${+key - 1}`,
                population: data[key],
                color: colors.shift(),
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            }
            result.push(item)
        }
        setData(result)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <PieChart
                data={data}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor={'population'}
                backgroundColor='white'
                paddingLeft={'15'}
                absolute={false}
                style={{ borderRadius: 16 }}
            />
            <Text style={[khaoSatStyles.title, { textAlign: 'center' }]}>
                Mức độ chuyển đổi số của các doanh nghiệp vừa và nhỏ tỉnh An Giang
            </Text>
        </>
    )
}

export default ThongKeCDSPieChart

const styles = StyleSheet.create({})
