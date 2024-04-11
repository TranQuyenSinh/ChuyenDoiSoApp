import { StyleSheet } from 'react-native'

export const pagerStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingHorizontal: 18,
    },
    pageTitle: {
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        textAlign: 'justify',
        lineHeight: 25,
    },
})
