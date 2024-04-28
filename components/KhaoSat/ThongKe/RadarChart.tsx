import { StyleSheet, Text, View, processColor } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { ChartLegend, RadarData, RadarChart as RDChart, xAxis } from 'react-native-charts-wrapper'
import { textStyles } from '@constants/Styles'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { KetQuaTruCot } from '@constants/KhaoSat/KetQuaTruCot'
import Colors from '@constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

interface RadarChartProps {
    data: KhaoSat
    width?: number
    backgroundColor?: string[]
}

const RadarChart = (props: RadarChartProps) => {
    const { data, width, backgroundColor } = props

    const dataset = useMemo(() => {
        if (data?.ketQuaTruCots?.length === 0) return undefined
        const dataset = data?.ketQuaTruCots.map((item: KetQuaTruCot) => ({ value: item.phanTram }))
        if (!dataset || dataset.length === 0) return undefined
        return {
            dataSets: [
                {
                    values: dataset,
                    label: 'Kết quả khảo sát',
                    config: {
                        valueFormatter: 'percent',
                        color: processColor('white'),
                        drawFilled: true,
                        fillColor: processColor('white'),
                        fillAlpha: 100,
                        lineWidth: 1,
                        valueTextSize: 10,
                        valueTextColor: processColor('white'),
                        drawValues: false,
                    },
                },
            ],
            labels: ['Khách hàng', 'Chiến lược', 'Công nghệ', 'Vận hành', 'Văn hóa DN', 'Dữ liệu'],
        }
    }, [data])

    const legend = useRef<ChartLegend>({
        enabled: false,
        textSize: 18,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        textColor: processColor('white'),
    }).current

    const xAxis = useRef<xAxis>({
        valueFormatter: ['Khách hàng', 'Chiến lược', 'Công nghệ', 'Vận hành', 'Văn hóa DN', 'Dữ liệu'],
        textSize: 8,
        textColor: processColor('white'),
    }).current

    if (!dataset) return <View />

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            colors={backgroundColor || ['#03b65a', '#54af48']}
            style={[styles.container, { height: 230, width: width || 300 }]}>
            <RDChart
                style={{ height: 230, width: width || 300 }}
                chartBackgroundColor={processColor('transparent')}
                data={dataset}
                xAxis={xAxis}
                minOffset={10}
                yAxis={{ drawLabels: false, textSize: 20, textColor: processColor('white'), centerAxisLabels: true }}
                chartDescription={{ text: '' }}
                legend={legend}
                drawWeb={true}
                touchEnabled={false}
                rotationEnabled={false}
                webLineWidth={0}
                webLineWidthInner={1}
                webAlpha={100}
                webColorInner={processColor('white')}
                skipWebLineCount={1}
            />
        </LinearGradient>
    )
}

export default RadarChart

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
    },
})
