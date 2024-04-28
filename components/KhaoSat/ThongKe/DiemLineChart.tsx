import React, { useEffect, useMemo, useState } from 'react'

import moment from 'moment'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { windowWidth } from '@utils/window'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'

const DiemLineChart = () => {
    const router = useRouter()
    const [data, setData] = useState<any>([])
    const { khaoSats } = useSelector((state: RootState) => state.khaoSat)

    useEffect(() => {
        if (khaoSats && khaoSats?.length !== 0) {
            const items = khaoSats?.slice?.()?.reverse() || []
            setData(items)
        }
    }, [khaoSats])

    const lineChartData = useMemo(() => {
        if (data && data?.length === 0) return undefined
        return {
            labels: data?.map((item: any) => moment(item.createdAt).format('MM/YYYY')),
            datasets: [
                {
                    data: data?.map((item: any) => item.tongDiem),
                },
            ],
        }
    }, [data])

    if (!lineChartData || data?.length === 0) return <View />

    return (
        <LineChart
            data={lineChartData}
            width={windowWidth - 75}
            height={230}
            chartConfig={{
                backgroundGradientFrom: '#213ff9',
                backgroundGradientTo: '#9908c7',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: '2',
                    strokeWidth: '2',
                    stroke: '#2db40b',
                },
                decimalPlaces: 0,
            }}
            onDataPointClick={({ index }) => {
                const id = data[index].id
                router.push(`/khaosat/${id}`)
            }}
            style={{
                borderRadius: 16,
            }}
        />
    )
}

export default DiemLineChart

const styles = StyleSheet.create({})
