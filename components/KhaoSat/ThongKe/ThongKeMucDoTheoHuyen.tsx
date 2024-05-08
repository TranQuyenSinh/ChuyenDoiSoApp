import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { BarChart, BarData, xAxis } from 'react-native-charts-wrapper'
import { processColor } from 'react-native-reanimated'
import { getThongKeMucDoTheoHuyen } from '@services/thongKeServices'
import { screenWidth } from '@utils/window'
import Colors from '@constants/Colors'

const ThongKeMucDoTheoHuyen = () => {
    const [data, setData] = useState<any>([])
    useEffect(() => {
        ;(async () => {
            const data = await getThongKeMucDoTheoHuyen()
            setData(data)
        })()
    }, [])

    const chartData = useMemo((): BarData | undefined => {
        if (!data) return undefined
        const values = Object.values(data).map((value: any) => ({ y: value }))
        return {
            dataSets: [
                {
                    values: values,
                    label: '',
                    config: {
                        color: processColor(Colors.default),
                        barShadowColor: processColor('lightgrey'),
                        valueTextSize: 12,
                        valueFormatter: '#0.0',
                    },
                },
            ],
            config: {
                barWidth: 0.7,
            },
        }
    }, [data])

    const xAxis = useMemo((): xAxis | undefined => {
        if (!data) return undefined
        const labels = Object.keys(data)
        return {
            valueFormatter: labels,
            textSize: 10,
            granularityEnabled: true,
            granularity: 1,
            labelRotationAngle: 50,
            position: 'BOTTOM',
            labelCount: 200,
            axisLineWidth: StyleSheet.hairlineWidth,
        }
    }, [data])

    if (!chartData || !xAxis) return <View />

    return (
        <View style={styles.container}>
            <BarChart
                style={styles.chart}
                data={chartData}
                xAxis={xAxis}
                legend={{
                    enabled: false,
                }}
                chartDescription={{ text: '' }}
                drawValueAboveBar={true}
                touchEnabled={false}
            />
        </View>
    )
}

export default ThongKeMucDoTheoHuyen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    chart: {
        flex: 1,
        width: screenWidth - 24,
        height: 250,
        backgroundColor: 'white',
    },
})
