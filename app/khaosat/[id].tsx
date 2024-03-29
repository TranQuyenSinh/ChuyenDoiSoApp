import React, { useMemo, useLayoutEffect } from 'react'

import { useSelector } from 'react-redux'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'

import { RootState } from '@redux/store'
import MoHinh from '@components/KhaoSat/MoHinh'
import PageHeader from '@components/View/PageHeader'
import NotFound from '@components/StatusPage/NotFound'
import KetQuaKhaoSat from '@components/KhaoSat/KetQuaKhaoSat'
import ChuyenGiaDanhGia from '@components/KhaoSat/ChuyenGiaDanhGia'

const KhaoSatDetail = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()
    const { khaoSats } = useSelector((state: RootState) => state.khaoSat)

    const selectedKhaoSat = useMemo(() => {
        return khaoSats.find(x => x.id === +id)
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (!selectedKhaoSat) {
        return <NotFound message='Không tìm thấy kết quả khảo sát' />
    }

    return (
        <View style={styles.container}>
            <PageHeader title={`Kết quả khảo sát #${selectedKhaoSat?.id}`} style={{ marginBottom: 12 }} />
            <ScrollView contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                {selectedKhaoSat?.mucDo && selectedKhaoSat.tongDiem && (
                    <KetQuaKhaoSat mucDo={selectedKhaoSat.mucDo} tongDiem={selectedKhaoSat.tongDiem} />
                )}
                {selectedKhaoSat.moHinh && <MoHinh data={selectedKhaoSat.moHinh} />}
                <ChuyenGiaDanhGia
                    chuyenGia={selectedKhaoSat?.chuyenGia}
                    danhGia={selectedKhaoSat?.chuyenGiaDanhGia}
                    deXuat={selectedKhaoSat?.chuyenGiaDeXuat}
                    danhGiaAt={selectedKhaoSat?.chuyenGiaDanhGiaAt}
                />
            </ScrollView>
        </View>
    )
}

export default KhaoSatDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
