import Colors from '@constants/Colors'
import { defaultStyles } from '@constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function NotFound({ message = 'Có lỗi xảy ra' }) {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>{message}</Text>
            <Pressable
                onPress={() => router.replace('(tabs)')}
                style={[defaultStyles.btn, { padding: 12, flexDirection: 'row', gap: 6, marginTop: 10 }]}>
                <Ionicons name='home-sharp' size={24} color={Colors.white} />
                <Text style={defaultStyles.btnText}>Về trang chủ</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
