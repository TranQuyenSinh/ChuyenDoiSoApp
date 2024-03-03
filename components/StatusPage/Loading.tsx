import { View, ViewStyle, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '@constants/Colors'
const { width } = Dimensions.get('window')

interface LoadingProps {
    containerStyles?: ViewStyle
    isCoverScreen?: boolean
}
export default function Loading({ containerStyles, isCoverScreen = false }: LoadingProps) {
    return (
        <View style={[styles.container, containerStyles, isCoverScreen && styles.containerAbsolute]}>
            <ActivityIndicator size={'large'} color={Colors.default} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afafaf1b',
        width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 19,
    },

    containerAbsolute: {
        position: 'absolute',
        backgroundColor: '#2c2c2c1b',
    },
})
