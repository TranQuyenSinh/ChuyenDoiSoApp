import Colors from '@constants/Colors'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window')
export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={Colors.default} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#0000001b',
        top: 0,
        width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 19,
    },
})
