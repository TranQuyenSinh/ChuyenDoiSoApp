import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-charts-wrapper'
import { processColor } from 'react-native-reanimated'
import { screenWidth } from '@utils/window'
import { getThongKeDNTheoLoaiHinh } from '@services/thongKeServices'
import Colors from '@constants/Colors'
import { Skeleton } from 'moti/skeleton'

const ThongKeDNTheoLoaiHinh = () => {
    const [data, setData] = useState<any>()
    useEffect(() => {
        ;(async () => {
            const data = await getThongKeDNTheoLoaiHinh()
            setData({
                labels: data.map((item: any) => item.tenLoaiHinh),
                dataSets: data.map((item: any) => ({ y: item.soLuong })),
            })
        })()
    }, [])

    if (!data || !data?.dataSets || !data?.labels)
        return <Skeleton width={screenWidth - 24} height={300} colorMode='light' />

    return (
        <View style={styles.container}>
            <BarChart
                style={styles.chart}
                data={{
                    dataSets: [
                        {
                            values: data.dataSets,
                            label: '',
                            config: {
                                color: processColor(Colors.default),
                                barShadowColor: processColor('lightgrey'),
                                valueTextSize: 8,
                            },
                        },
                    ],
                    config: {
                        barWidth: 0.4,
                    },
                }}
                xAxis={{
                    valueFormatter: data.labels,
                    valueFormatterPattern: '',
                    textSize: 10,
                    granularityEnabled: true,
                    granularity: 1,
                    labelRotationAngle: -90,
                    position: 'BOTTOM',
                    labelCount: 200,
                    axisLineWidth: StyleSheet.hairlineWidth,
                }}
                legend={{
                    enabled: false,
                }}
                chartDescription={{ text: '' }}
                gridBackgroundColor={processColor('#ffffff')}
                drawBarShadow={false}
                drawValueAboveBar={true}
                onChange={event => console.log(event.nativeEvent)}
                touchEnabled={false}
            />
        </View>
    )
}

export default ThongKeDNTheoLoaiHinh

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
