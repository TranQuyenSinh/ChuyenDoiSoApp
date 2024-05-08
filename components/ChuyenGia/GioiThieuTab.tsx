import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { chuyenGiaStyles } from './chuyenGiaStyles'

const GioiThieuTab = () => {
    const { chuyenGia } = useSelector((state: RootState) => state.chuyenGia)
    if (!chuyenGia) return <View />
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            style={[chuyenGiaStyles.container, { padding: 12, paddingTop: 0 }]}>
            {chuyenGia.moTa && <Text style={chuyenGiaStyles.description}>{chuyenGia.moTa}</Text>}
        </ScrollView>
    )
}

export default GioiThieuTab

const styles = StyleSheet.create({})
