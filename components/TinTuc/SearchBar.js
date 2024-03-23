import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'
import { router } from 'expo-router'

const SearchBar = ({ searchKey, onChangeSearchKey, onSearch }) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.iconWrapper}>
                <Pressable
                    style={{ padding: 2 }}
                    android_ripple={{ color: 'grey', borderless: true }}
                    onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} />
                </Pressable>
            </View>
            <View style={styles.searchWrapper}>
                <TextInput
                    value={searchKey}
                    onChangeText={text => onChangeSearchKey(text)}
                    placeholder='Tìm kiếm...'
                    style={{ flex: 1 }}
                />
                {searchKey && (
                    <Pressable onPress={() => onChangeSearchKey('')} style={{ zIndex: 99 }}>
                        <Ionicons name='close-circle-sharp' size={24} color={Colors.bodyText} />
                    </Pressable>
                )}
            </View>
            <View style={styles.iconWrapper}>
                <Pressable
                    android_ripple={{ color: 'grey', borderless: true }}
                    onPress={searchKey ? onSearch : undefined}>
                    <Ionicons name='search-outline' size={24} color={Colors.bodyText} />
                </Pressable>
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    iconWrapper: {
        padding: 6,
        borderRadius: 50,
        overflow: 'hidden',
    },
    searchContainer: {
        backgroundColor: Colors.white,
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: 'white',
        marginBottom: 2,
        paddingHorizontal: 18,
        height: 44,
        overflow: 'hidden',
        flex: 1,
    },
})
