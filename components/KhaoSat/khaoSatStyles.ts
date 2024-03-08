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
    boxsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 6,
        alignItems: 'flex-start',
    },
    box: {
        borderRadius: 18,
        padding: 12,
        flexGrow: 1,
    },
    boxTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
    boxNumber: {
        color: Colors.white,
        fontWeight: '800',
        fontSize: 20,
    },
    boxSub: {
        color: Colors.white,
        alignSelf: 'flex-end',
        marginTop: 6,
    },
})
