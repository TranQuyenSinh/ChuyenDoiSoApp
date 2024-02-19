import Colors from '@constants/Colors'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native'

const { width, height } = Dimensions.get('window')
interface LoadingProps {
    containerStyles: ViewStyle
}
export default function Loading({ containerStyles }: LoadingProps) {
    return (
        <View style={[styles.container, containerStyles]}>
            <ActivityIndicator size={'large'} color={Colors.default} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000001b',
        width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 19,
    },
})
