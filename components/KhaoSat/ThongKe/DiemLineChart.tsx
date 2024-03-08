import React, { useMemo } from 'react'

import moment from 'moment'
import { useRouter } from 'expo-router'
import { StyleSheet, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { windowWidth } from '@utils/window'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { khaoSatStyles } from '../khaoSatStyles'

type DiemLineChartProps = {
    data: KhaoSat[]
}

const DiemLineChart = ({ data }: DiemLineChartProps) => {
    const router = useRouter()

    const lineChartData = useMemo(
        () => ({
            labels: data.map(item => moment(item.createdAt).format('MM/YYYY')),
            datasets: [
                {
                    data: data.map(item => item.tongDiem),
                },
            ],
        }),
        [data]
    )
    return (
        <>
            <LineChart
                data={lineChartData}
                width={windowWidth - 32}
                height={300}
                verticalLabelRotation={30}
                chartConfig={{
                    backgroundGradientFrom: '#4ba0fa',
                    backgroundGradientTo: '#4ee9f2',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#4ee9f2',
                    },
                    decimalPlaces: 0,
                }}
                onDataPointClick={({ index }) => {
                    const id = data[index].id
                    router.push(`/khaosat/${id}`)
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}
            />
            <Text style={[khaoSatStyles.title, { textAlign: 'center' }]}>
                Điểm khảo sát của doanh nghiệp theo từng đợt đánh giá
            </Text>
        </>
    )
}

export default DiemLineChart

const styles = StyleSheet.create({})
