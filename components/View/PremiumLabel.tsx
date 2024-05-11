import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import { appIcons, appImages } from '@constants/Images'

interface PremiumLabelProps {
    style?: StyleProp<ViewStyle>
}

const PremiumLabel = ({ style }: PremiumLabelProps) => {
    return (
        <RowComponent gap={6} styles={[styles.container, style]}>
            <Image source={appIcons.premium} style={styles.image} />
            <Text style={styles.text}>Thành viên Hiệp hội Doanh nghiệp</Text>
        </RowComponent>
    )
}

export default PremiumLabel

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffe4486b',
        borderRadius: 30,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ffd900ff',
    },
    image: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
})
