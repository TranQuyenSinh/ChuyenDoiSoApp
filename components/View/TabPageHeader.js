import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabPageHeader = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

export default TabPageHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
        paddingHorizontal: 16,
    },
})
