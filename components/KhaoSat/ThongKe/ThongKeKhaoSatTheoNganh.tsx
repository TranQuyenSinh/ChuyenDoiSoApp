import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-charts-wrapper'
import { processColor } from 'react-native-reanimated'

const ThongKeKhaoSatTheoNganh = () => {
    return (
        <View style={styles.container}>
            <BarChart
                style={styles.chart}
                data={{
                    dataSets: [
                        {
                            values: [
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                                { y: 100 },
                                { y: 105 },
                                { y: 102 },
                                { y: 110 },
                                { y: 114 },
                                { y: 109 },
                                { y: 105 },
                                { y: 99 },
                                { y: 95 },
                                { y: 95 },
                            ],
                            label: '',
                            config: {
                                color: processColor('teal'),
                                barShadowColor: processColor('lightgrey'),
                                valueTextSize: 12,
                            },
                        },
                    ],
                    config: {
                        barWidth: 0.4,
                    },
                }}
                xAxis={{
                    valueFormatter: [
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                        'Jan AJN JAN JAN JNA JAN ',
                    ],
                    textSize: 8,
                    granularityEnabled: true,
                    granularity: 1,
                    labelRotationAngle: 50,
                    position: 'BOTTOM',
                    labelCount: 200,
                    axisLineWidth: StyleSheet.hairlineWidth,
                }}
                animation={{ durationX: 2000 }}
                legend={{
                    enabled: false,
                }}
                chartDescription={{ text: '' }}
                gridBackgroundColor={processColor('#ffffff')}
                visibleRange={{ x: { min: 5, max: 5 } }}
                drawBarShadow={false}
                drawValueAboveBar={true}
                onChange={event => console.log(event.nativeEvent)}
                touchEnabled={false}
            />
        </View>
    )
}

export default ThongKeKhaoSatTheoNganh

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    chart: {
        flex: 1,
        width: 300,
        height: 250,
        backgroundColor: 'white',
    },
})
