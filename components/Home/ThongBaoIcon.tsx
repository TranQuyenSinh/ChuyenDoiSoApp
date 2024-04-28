import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import IconButton from '@components/View/IconButton'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import Colors from '@constants/Colors'
import { fetchThongBao } from '@redux/thongBaoSlice'

const ThongBaoIcon = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { thongBaos } = useSelector((state: RootState) => state.thongBao)
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchThongBao())
        }
    }, [isLoggedIn])

    return (
        <IconButton onPress={() => router.push("/thongbao")}>
            <FontAwesome name='bell' size={24} color='white' />
            {thongBaos.filter(x => !x.daXem).length > 0 &&
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{thongBaos.length}</Text>
                </View>}
        </IconButton>
    )
}

export default ThongBaoIcon

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Colors.error.default,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,

    },
    badgeText: {
        color: 'white',
        fontSize: 10
    },
})