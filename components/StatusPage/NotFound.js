import { useRouter } from 'expo-router'
import { Text, View, Pressable, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@constants/Styles'

export default function NotFound({
    message = 'Có lỗi xảy ra',
    isShownBtn = true,
    btnText = 'Vể trang chủ',
    btnIcon = 'home-sharp',
    redirectHref = '(tabs)',
}) {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>{message}</Text>
            {isShownBtn && (
                <Pressable
                    onPress={() => router.replace(redirectHref)}
                    style={[defaultStyles.btn, { padding: 12, flexDirection: 'row', gap: 6, marginTop: 10 }]}>
                    <Ionicons name={btnIcon} size={24} color={Colors.white} />
                    <Text style={defaultStyles.btnText}>{btnText}</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
})
