import React from 'react'
import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Colors from '@constants/Colors'

const NotFound = () => {
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
