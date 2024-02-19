import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export default dnStyles = StyleSheet.create({
    contentContainer: {
        // marginTop: 12,
        paddingHorizontal: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.bodyText,
    },
    itemColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        color: Colors.textGray,
    },
    imgCCCD: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 12,
    },
})
