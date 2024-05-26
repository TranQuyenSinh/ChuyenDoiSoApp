import { ActivityIndicator, processColor, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { BarChart, BarData, xAxis } from 'react-native-charts-wrapper'
import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { getLinhVucs } from '@services/tinTucServices'
import { getThongKeSoLuongDoanhNghiepTheoHuyen } from '@services/thongKeServices'
import { TKSoLuongDN } from '@constants/ThongKe/ThongKeTypes'
import { screenWidth } from '@utils/window'
import { Skeleton } from 'moti/skeleton'

const SoLuongDoanhNghiepTheoTinhChart = () => {
    const [linhVucs, setLinhVucs] = useState<LinhVuc[]>([])
    const [data, setData] = useState<TKSoLuongDN[]>([])
    useEffect(() => {
        ;(async () => {
            const res = await getLinhVucs()
            setLinhVucs(res)
            const data = await getThongKeSoLuongDoanhNghiepTheoHuyen()
            setData(data)
        })()
    }, [])

    const chartData = useMemo((): BarData | undefined => {
        if (linhVucs.length === 0) return undefined
        if (data.length === 0) return undefined
        const values = data.map(item => ({ y: [item.cn, item.kh, item.nn, item.tmdv] }))
        return {
            dataSets: [
                {
                    values: values,
                    label: '',
                    config: {
                        colors: [
                            processColor('#11d35d'),
                            processColor('#3abefa'),
                            processColor('#fbe16a'),
                            processColor('#f59163'),
                        ],
                        stackLabels: linhVucs.map(linhVuc => linhVuc.tenLinhVuc),
                        valueTextSize: 0,
                        valueTextColor: processColor('white'),
                    },
                },
            ],
            config: {
                barWidth: 0.7,
            },
        }
    }, [linhVucs, data])

    const xAxis = useMemo((): xAxis | undefined => {
        if (data.length === 0) return undefined
        return {
            valueFormatter: data.map(item => item.huyen),
            granularityEnabled: true,
            granularity: 1,
            labelRotationAngle: 40,
            position: 'BOTTOM',
            labelCount: 200,
            axisLineWidth: StyleSheet.hairlineWidth,
        }
    }, [data])

    if (!chartData || !xAxis) return <Skeleton width={screenWidth - 24} height={300} colorMode='light' />
    return (
        <View style={styles.container}>
            <BarChart
                style={styles.chart}
                xAxis={xAxis}
                data={chartData}
                legend={{
                    enabled: true,
                    textSize: 10,
                    wordWrapEnabled: true,
                    xEntrySpace: 10,
                    horizontalAlignment: 'CENTER',
                }}
                drawValueAboveBar={false}
                chartDescription={{ text: '' }}
                touchEnabled={false}
                onSelect={() => {}}
                onChange={event => console.log(event.nativeEvent)}
            />
        </View>
    )
}

export default SoLuongDoanhNghiepTheoTinhChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    chart: {
        flex: 1,
        width: screenWidth - 24,
        height: 400,
        backgroundColor: 'white',
    },
})
