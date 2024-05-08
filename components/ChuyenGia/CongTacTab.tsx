import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'

const CongTacTab = () => {
    const { chuyenGia } = useSelector((state: RootState) => state.chuyenGia)
    if (!chuyenGia) return <View />
    return (
        <View>
            <Text>CongTacTab</Text>
        </View>
    )
}

export default CongTacTab

const styles = StyleSheet.create({})
