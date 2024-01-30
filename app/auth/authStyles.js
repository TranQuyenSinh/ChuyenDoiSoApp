import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export default authStyles = StyleSheet.create({
    hidePasswordBtn: {
        position: 'absolute',
        right: 12,
        top: 33,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 24,
        gap: 16,
        paddingTop: 100,
    },
    label: {
        color: Colors.bodyText,
        marginBottom: 4,
    },
    redStar: {
        color: Colors.error.dark,
    },
    separatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    seperatorLine: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separatorText: {
        fontFamily: 'mon-sb',
        color: Colors.bodyText,
        fontSize: 14,
    },
    btnOther: {},
    btnOtherText: {},
})
