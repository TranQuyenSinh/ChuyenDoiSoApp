import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const CreatePostButton = () => {
    return (
        <TouchableOpacity
            onPress={() => router.push('/social/baiviet/create')}
            activeOpacity={0.7}
            style={styles.contentBlur}>
            <Ionicons name='add' size={20} color={'white'} />
            <Text style={styles.text}>Đăng bài</Text>
        </TouchableOpacity>
    )
}

export default CreatePostButton

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    contentBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor: '#059b80',
    },
    text: {
        fontWeight: '500',
        color: 'white',
    },
})
