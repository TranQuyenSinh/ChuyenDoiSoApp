import Button from '@components/Button'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window')

interface TryAgainProps {
    onPress: () => void
}

export default function TryAgain({ onPress }: TryAgainProps) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 12 }}>Có lỗi xảy ra</Text>
            <Button
                btnStyles={{ paddingHorizontal: 12 }}
                renderIcon={<Ionicons name='reload-sharp' size={24} color={Colors.white} />}
                text='Thử lại'
                onPress={onPress}
            />
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
