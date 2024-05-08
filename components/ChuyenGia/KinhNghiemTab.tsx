import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import { chuyenGiaCardStyles, chuyenGiaStyles } from './chuyenGiaStyles'

const KinhNghiemTab = () => {
    const { chuyenGia } = useSelector((state: RootState) => state.chuyenGia)
    if (!chuyenGia) return <View />
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={chuyenGiaStyles.container}>
            {chuyenGia.kinhNghiems?.map(item => (
                <View style={chuyenGiaCardStyles.container}>
                    <View style={chuyenGiaCardStyles.row}>
                        <Text style={chuyenGiaCardStyles.rowTitle}>Dự án</Text>
                        <Text style={chuyenGiaCardStyles.rowText}>{item.tenDuAn}</Text>
                    </View>
                    <View style={chuyenGiaCardStyles.row}>
                        <Text style={chuyenGiaCardStyles.rowTitle}>Thời gian</Text>
                        <Text style={chuyenGiaCardStyles.rowText}>{item.thoiGian}</Text>
                    </View>
                    <Text style={chuyenGiaCardStyles.rowTitle}>Mô tả</Text>
                    <Text style={chuyenGiaCardStyles.rowTextLeft}>{item.moTa}</Text>
                    <Text style={chuyenGiaCardStyles.rowTitle}>Vai trò</Text>
                    <Text style={chuyenGiaCardStyles.rowTextLeft}>{item.ketQua}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default KinhNghiemTab

const styles = StyleSheet.create({})
