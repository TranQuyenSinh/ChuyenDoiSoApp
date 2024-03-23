import React, { useEffect, useMemo } from 'react'

import moment from 'moment'
import { useRouter } from 'expo-router'
import { StyleSheet, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { windowWidth } from '@utils/window'
import { KhaoSat } from '@constants/KhaoSat/KhaoSatType'
import { khaoSatStyles } from '../khaoSatStyles'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import Loading from '@components/StatusPage/Loading'

const DiemLineChart = () => {
    const router = useRouter()
    const { khaoSats } = useSelector((state: RootState) => state.khaoSat)

    useEffect(() => {
        if (khaoSats?.length !== 0) {
            khaoSats.slice().sort((a, b) => b.id - a.id)
        }
    }, [khaoSats])

    const lineChartData = useMemo(() => {
        if (khaoSats?.length === 0) return undefined
        return {
            labels: khaoSats?.map(item => moment(item.createdAt).format('MM/YYYY')),
            datasets: [
                {
                    data: khaoSats?.map(item => item.tongDiem),
                },
            ],
        }
    }, [khaoSats])

    if (!lineChartData) return <Loading />

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
                    const id = khaoSats[index].id
                    router.push(`/khaosat/${id}`)
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}
            />
            <Text style={[khaoSatStyles.title, { textAlign: 'center' }]}>Thống kê điểm khảo sát của doanh nghiệp</Text>
        </>
    )
}

export default DiemLineChart

const styles = StyleSheet.create({})
