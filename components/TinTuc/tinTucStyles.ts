import Colors from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const tinTucStyles = StyleSheet.create({
    itemContainer: {
        marginBottom: 12,
    },
    title: {
        fontWeight: '500',
        fontSize: 24,
    },
    tomTat: {
        textAlign: 'justify',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 8,
        color: Colors.bodyText,
    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
        marginTop: 10,
    },
})
