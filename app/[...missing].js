import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Colors from '@constants/Colors'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'

const NotFound = () => {
    const router = useRouter()
    const { isLoggedIn } = useSelector(state => state.user)

    useEffect(() => {
        console.log('===> Not found route')
        if (isLoggedIn) {
            router.push('(tabs)')
        } else {
            router.back()
        }
    }, [isLoggedIn])

    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size='large' color={Colors.default} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})
export default NotFound
