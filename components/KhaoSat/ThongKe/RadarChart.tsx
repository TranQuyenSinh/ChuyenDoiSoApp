import { StyleSheet, Text, View, processColor } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { ChartLegend, RadarData, RadarChart as RDChart, xAxis } from 'react-native-charts-wrapper';
import { textStyles } from '@constants/Styles';
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType';
import { KetQuaTruCot } from '@constants/KhaoSat/KetQuaTruCot';


interface RadarChartProps {
    data: KhaoSat
}

const RadarChart = (props: RadarChartProps) => {
    const { data } = props

    const dataset = useMemo(() => {
        if (data?.ketQuaTruCots?.length === 0) return undefined
        console.log('==> log: ', data?.ketQuaTruCots.map((item: KetQuaTruCot) => ({ value: (item.phanTram / 16) * 100 })))
        return {
            dataSets: [
                {
                    values: [{ value: 6 }, { value: 12 }, { value: 1.5 }, { value: 15.9 }, { value: 3 }, { value: 9 }],
                    label: 'Kết quả khảo sát #34',
                    config: {
                        valueFormatter: 'percent',
                        color: processColor('#FF8C9D'),
                        drawFilled: true,
                        fillColor: processColor('#FF8C9D'),
                        fillAlpha: 100,
                        lineWidth: 2,
                        valueTextSize: 12,
                        valueTextColor: processColor('white'),
                    }
                }
            ],
            labels: ['Khách hàng', 'Chiến lược', 'Công nghệ', 'Vận hành', 'Văn hóa DN', 'Dữ liệu']
        }
    }, [data])

    const legend = useRef<ChartLegend>({
        enabled: false,
        textSize: 18,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        textColor: processColor('white')
    }).current

    const xAxis = useRef<xAxis>({
        valueFormatter: ['Khách hàng', 'Chiến lược', 'Công nghệ', 'Vận hành', 'Văn hóa DN', 'Dữ liệu'],
        textSize: 12,
        textColor: processColor('white')
    }).current

    if (!dataset) return <View />

    return (
        <View style={styles.container}>
            <RDChart
                style={styles.chart}
                data={dataset}
                xAxis={xAxis}
                yAxis={{ drawLabels: false, textSize: 20, textColor: processColor('white') }}
                chartDescription={{ text: '' }}
                legend={legend}
                drawWeb={true}
                touchEnabled={false}
                rotationEnabled={false}
                webLineWidth={0}
                webLineWidthInner={1}
                webAlpha={200}
                // webColor={processColor("red")}
                webColorInner={processColor("white")}
                skipWebLineCount={1}
            />
            <Text
                style={[
                    textStyles.title,
                    {
                        color: 'white',
                        marginTop: 6, alignSelf: 'center', marginBottom: 0, marginHorizontal: 24, textAlign: 'center'
                    },
                ]}>
                Mức độ chuyển đổi số trên từng trụ cột
            </Text>
        </View>
    )
}

export default RadarChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
        width: '100%',
        alignSelf: 'center'
    },
    chart: {
        flex: 1
    }
})