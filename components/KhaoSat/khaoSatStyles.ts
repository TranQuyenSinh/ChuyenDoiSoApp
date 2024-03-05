import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const khaoSatStyles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: Colors.white,
        elevation: 6,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 6,
    },
})
