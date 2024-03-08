import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { khaoSatStyles } from './khaoSatStyles'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { MucDo } from '@constants/KhaoSat/MucDoType'

type KetQuaKhaoSatProps = {
    mucDo: MucDo
    tongDiem: number
}

const KetQuaKhaoSat = ({ mucDo, tongDiem }: KetQuaKhaoSatProps) => {
    const router = useRouter()
    return (
        <>
            <Text style={[khaoSatStyles.title, { marginTop: 0 }]}>Kết quả khảo sát</Text>
            <View style={khaoSatStyles.boxsContainer}>
                <Pressable
                    style={{ flex: 6 }}
                    onPress={() =>
                        router.push({
                            pathname: '/khaosat/mucdo',
                            params: { id: (mucDo?.id || 0) - 1 },
                        })
                    }>
                    <LinearGradient
                        start={{ x: 0, y: 0.2 }}
                        colors={['#4ee9f2', '#4ba0fa']}
                        style={[khaoSatStyles.box]}>
                        <Text style={khaoSatStyles.boxTitle}>Mức độ CDS</Text>
                        <Text style={khaoSatStyles.boxNumber}>{mucDo?.tenMucDo}</Text>
                        <Text style={khaoSatStyles.boxSub}>Xem chi tiết {'>'}</Text>
                    </LinearGradient>
                </Pressable>
                <View style={{ flex: 4 }}>
                    <LinearGradient
                        start={{ x: 0, y: 0.2 }}
                        colors={['#38ef7d', '#15b175']}
                        style={[khaoSatStyles.box]}>
                        <Text style={khaoSatStyles.boxTitle}>Điểm</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text
                                style={[
                                    khaoSatStyles.boxNumber,
                                    {
                                        fontSize: 30,
                                    },
                                ]}>
                                {tongDiem}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </>
    )
}

export default KetQuaKhaoSat

const styles = StyleSheet.create({})
