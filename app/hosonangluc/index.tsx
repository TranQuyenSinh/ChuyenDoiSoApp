import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Pdf from 'react-native-pdf'
import { useAppSelector } from '@redux/store'
import { windowWidth, windowHeight } from '@utils/window'
import { stackOptions } from '@configs/ScreenConfig'

const HoSoDoanhNghiep = () => {
    const { selectedDoanhNghiep } = useAppSelector(state => state.doanhNghiep)
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Hồ sơ năng lực',
                    ...stackOptions,
                }}
            />
            {selectedDoanhNghiep?.hoSoNangLuc && (
                <Pdf trustAllCerts={false} source={{ uri: selectedDoanhNghiep.hoSoNangLuc }} style={styles.pdf} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
})

export default HoSoDoanhNghiep
