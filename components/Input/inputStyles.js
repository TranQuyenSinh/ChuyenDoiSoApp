import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const inputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#ebebeb',
        paddingHorizontal: 16,
        borderRadius: 8,
        paddingVertical: 10,
        borderColor: '#c5d1f8',
        borderWidth: 1,
        height: 50,
    },
    errorContainer: {
        shadowColor: '#f23a3a',
        borderWidth: 1,
        borderColor: '#f23a3a',
    },
    errorText: {
        color: '#f23a3a',
    },
    inputLabel: {
        color: 'white',
        position: 'absolute',
        backgroundColor: 'transparent',
        top: -20,
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
