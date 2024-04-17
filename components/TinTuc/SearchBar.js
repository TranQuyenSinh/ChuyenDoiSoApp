import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchBar = ({ searchKey, onChangeSearchKey, onSearch }) => {
    return (
        <SafeAreaView style={{ backgroundColor: Colors.default }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 18, paddingVertical: 4 }}>
                Tin tức Chuyển đổi số
            </Text>
            <View style={styles.searchContainer}>
                <View style={styles.iconWrapper}>
                    <Pressable
                        style={{ padding: 0 }}
                        android_ripple={{ color: 'grey', borderless: true }}
                        onPress={() => router.back()}>
                        <Ionicons name='chevron-back-outline' size={24} color={'white'} />
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
                    <View style={styles.iconWrapper}>
                        <Pressable
                            android_ripple={{ color: 'grey', borderless: true }}
                            onPress={searchKey ? onSearch : undefined}>
                            <Ionicons name='search-outline' size={24} color={Colors.bodyText} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    iconWrapper: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    searchWrapper: {
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: 'white',
        marginBottom: 2,
        paddingHorizontal: 12,
        overflow: 'hidden',
        flex: 1,
    },
})
