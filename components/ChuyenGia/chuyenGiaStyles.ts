import { StyleSheet } from 'react-native';

export const chuyenGiaStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    title: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#343c48',
    },
    description: {
        // marginTop: 8,
        lineHeight: 20
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    }
})

export const chuyenGiaCardStyles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    rowTitle: {
        fontWeight: '500',
        fontSize: 12
    },
    rowText: {
        fontSize: 12,
        color: '#080808',
        flexShrink: 1,
        textAlign: 'right',
    },
    rowTextLeft: {
        fontSize: 12,
        color: '#080808',
        flexShrink: 1,
        marginBottom: 12
    },

})