import React, { useEffect, useMemo, useState } from 'react'

import moment from 'moment'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { windowWidth } from '@utils/window'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'
import { textStyles } from '@constants/Styles'

const DiemLineChart = () => {
    const router = useRouter()
    const { khaoSats } = useSelector((state: RootState) => state.khaoSat)
    const dispatch = useDispatch<AppDispatch>()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const [data, setData] = useState<any>([])
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchDanhSachKhaoSat())
            dispatch(fetchDoanhNghiepInfo())
        }
    }, [isLoggedIn])
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

    if (!lineChartData || data?.length === 0) return <View></View>

    return (
        <>
            <LineChart
                data={lineChartData}
                width={windowWidth - 32}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: '#213ff9',
                    backgroundGradientTo: '#9908c7',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: '6',
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
            <Text
                style={[
                    textStyles.title,
                    {
                        color: 'white',
                        marginTop: 6, alignSelf: 'center', marginBottom: 0, marginHorizontal: 24, textAlign: 'center'
                    },
                ]}>
                Điếm đánh giá mức độ CĐS của bạn qua từng phiếu khảo sát
            </Text>
        </>
    )
}

export default DiemLineChart

const styles = StyleSheet.create({})
