import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'

const HocTapTab = () => {
    const { chuyenGia } = useSelector((state: RootState) => state.chuyenGia)
    if (!chuyenGia) return <View />
    return (
        <View>
            <Text>HocTapTab</Text>
        </View>
    )
}

export default HocTapTab

const styles = StyleSheet.create({})
