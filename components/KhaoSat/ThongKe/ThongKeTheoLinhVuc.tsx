import React, { useMemo, useState, useEffect } from 'react'

import { ActivityIndicator, processColor, StyleSheet, View } from 'react-native'

import { axios } from '@utils/axios'
import { screenWidth } from '@utils/window'
import { getThongKeTheoLinhVuc } from '@services/thongKeServices'
import { PieChart, PieData } from 'react-native-charts-wrapper'
import Colors from '@constants/Colors'
import { Skeleton } from 'moti/skeleton'

const ThongKeTheoLinhVuc = () => {
    const [data, setData] = useState<any[]>([])
    const fetchData = async () => {
        const data = await getThongKeTheoLinhVuc()
        setData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const chartData = useMemo((): PieData | undefined => {
        if (!data) return undefined
        const values = data.map((item: any) => ({ value: item.soLuong, label: item.tenLinhVuc }))
        return {
            dataSets: [
                {
                    values: values,
                    label: '',
                    config: {
                        colors: [
                            processColor('#8CEAFF'),
                            processColor('#FFF78C'),
                            processColor('#FFD08C'),
                            processColor('#C0FF8C'),
                        ],
                        valueTextSize: 14,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13,
                        valueFormatter: "#.#'%'",
                        valueLineColor: processColor('green'),
                        valueLinePart1Length: 0.5,
                    },
                },
            ],
        }
    }, [data])

    if (data.length === 0) return <Skeleton width={screenWidth - 24} height={300} colorMode='light' />

    return (
        <View style={styles.container}>
            <PieChart
                style={styles.chart}
                logEnabled={true}
                chartBackgroundColor={processColor('pink')}
                chartDescription={{ text: '' }}
                data={chartData}
                legend={{
                    enabled: true,
                    textSize: 14,
                    form: 'CIRCLE',
                    horizontalAlignment: 'RIGHT',
                    verticalAlignment: 'CENTER',
                    orientation: 'VERTICAL',
                    wordWrapEnabled: true,
                }}
                entryLabelColor={processColor('green')}
                rotationEnabled={true}
                rotationAngle={45}
                usePercentValues={true}
                drawEntryLabels={false}
                centerTextRadiusPercent={100}
                holeRadius={40}
                transparentCircleRadius={45}
                transparentCircleColor={processColor('#f0f0f088')}
                maxAngle={360}
            />
        </View>
    )
}

export default ThongKeTheoLinhVuc

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
