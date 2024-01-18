import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'expo-router'
import { defaultStyles } from '@constants/Styles'
import { useSelector } from 'react-redux'

export default function TabOneScreen() {
    const user = useSelector(state => state.user)
    const [data, setData] = useState()

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>{user?.userProfile?.email}</Text>
            <Text>{user.isLoggedIn ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
