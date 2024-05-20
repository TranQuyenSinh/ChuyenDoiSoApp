import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import CreatePostButton from './CreatePostButton'
import { router } from 'expo-router'

interface TopSearchProps {
    value: string
    onChangeText: (text: string) => void
    onSubmitEditing: (e: any) => void
}

const TopSearch = (props: TopSearchProps) => {
    const { value, onChangeText, onSubmitEditing } = props
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name='search-outline' size={16} color={'white'} />
                <TextInput
                    returnKeyLabel='Tìm'
                    returnKeyType='search'
                    onSubmitEditing={onSubmitEditing}
                    cursorColor={'white'}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor={'white'}
                    placeholder='Tìm kiếm'
                    style={styles.input}
                />
                {value && (
                    <Pressable onPress={() => onChangeText('')}>
                        <Ionicons name='close-outline' size={20} color={'white'} />
                    </Pressable>
                )}
            </View>
            <TouchableOpacity
                onPress={() => router.push('/social/baiviet/create')}
                activeOpacity={0.7}
                style={buttonStyles.contentBlur}>
                <Ionicons name='add' size={20} color={'white'} />
                <Text style={buttonStyles.text}>Đăng bài</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default TopSearch

const buttonStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.default,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 6,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        backgroundColor: '#a8c4ef83',
        borderRadius: 24,

        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 6,
        color: 'white',
    },
})
