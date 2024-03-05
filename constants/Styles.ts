import Colors from '@constants/Colors'
import { findFocusedRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingBottom: 60,
    },
    inputField: {
        height: 44,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.bodyText,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    primaryBtn: {
        backgroundColor: Colors.default,
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryBtn: {
        backgroundColor: Colors.secondaryButton,
        height: 48,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 160,
        gap: 10,
    },
    buttonIcon: { width: 24, height: 24, resizeMode: 'cover' },
    btn: {
        backgroundColor: Colors.default,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    footer: {
        position: 'absolute',
        height: 50,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})

export const textStyles = StyleSheet.create({
    longText: {
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 24,
    },
    small: {
        fontSize: 14,
        color: Colors.bodyText,
        fontFamily: 'mon-sb',
    },
    medium: {
        fontSize: 16,
        color: Colors.bodyText,
        fontFamily: 'mon-sb',
    },
    large: {
        fontSize: 20,
        color: Colors.bodyText,
        fontFamily: 'mon-b',
    },
    mutedSmall: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'mon',
    },
})

export const linkStyles = StyleSheet.create({
    small: {
        fontSize: 14,
        color: Colors.default,
        fontFamily: 'mon-sb',
    },
})
