import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import CreatePostButton from './CreatePostButton'

interface TopSearchProps {
    value: string
    onChangeText: (text: string) => void
}

const TopSearch = (props: TopSearchProps) => {
    const { value, onChangeText } = props
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name='search-outline' size={16} color={'white'} />
                <TextInput
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
            <CreatePostButton />
        </SafeAreaView>
    )
}

export default TopSearch

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