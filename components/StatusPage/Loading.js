import Colors from '@constants/Colors'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

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
        alignItems: 'center',
        justifyContent: 'center',
    },
})
