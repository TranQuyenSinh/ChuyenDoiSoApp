import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const formStyles = StyleSheet.create({
    container: {
        paddingTop: 0,
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'mon-b',
        fontSize: 20,
        color: Colors.blueGray,
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionContainer: {
        backgroundColor: '#00000043',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        // marginHorizontal: 16,
    },
    sectionTitle: {
        color: 'white',
        marginBottom: 12,
        marginVertical: 6,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    navigateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    navigateBtn: {
        flexDirection: 'row',
        gap: 6,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.default,
        borderRadius: 50,
        minWidth: 140,
        height: 45,
    },
    navigateText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
})
