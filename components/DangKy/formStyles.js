import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const formStyles = StyleSheet.create({
    title: {
        fontFamily: 'mon-b',
        fontSize: 20,
        color: Colors.blueGray,
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionContainer: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 12,
        elevation: 10,
        marginBottom: 20,
        marginHorizontal: 16,
    },
    sectionTitle: {
        marginVertical: 6,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
})
