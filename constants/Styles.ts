import Colors from '@constants/Colors'
import { findFocusedRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: Colors.bodyText,
        borderRadius: 6,
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
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: Colors.placeHolder,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
})

export const textStyles = StyleSheet.create({
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
})

export const linkStyles = StyleSheet.create({
    small: {
        fontSize: 14,
        color: Colors.default,
        fontFamily: 'mon-sb',
    },
})
