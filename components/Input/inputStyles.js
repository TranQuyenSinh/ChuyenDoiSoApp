import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const inputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 10,
        borderColor: '#c5d1f8',
        borderWidth: 1,
        height: 50,
    },
    errorContainer: {
        shadowColor: 'red',
        borderWidth: 1,
        borderColor: 'red',
    },
    inputLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 10,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    countLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        right: 14,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 2,
        fontSize: 12,
        color: Colors.textGray,
    },
    input: {
        fontSize: 16,
    },
})
