import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '@constants/Colors'

const PageHeader = ({ title }) => {
    const router = useRouter()
    return (
        <View>
            <TouchableOpacity style={styles.headerArrow} onPress={() => router.back()}>
                <Ionicons name='chevron-back-outline' size={24} color={Colors.bodyText} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

export default PageHeader

const styles = StyleSheet.create({
    headerArrow: {
        zIndex: 10,
        width: 'auto',
        position: 'absolute',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
})
