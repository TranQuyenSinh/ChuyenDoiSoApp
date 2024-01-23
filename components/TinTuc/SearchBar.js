import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { textStyles } from '@constants/Styles'

const SearchBar = ({ searchKey, onChangeSearchKey, onSearch }) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <Ionicons name='search-outline' size={24} color={Colors.bodyText} />
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
            <Pressable onPress={searchKey ? onSearch : undefined}>
                <Text style={[textStyles.small, { color: searchKey ? Colors.default : Colors.buttonText }]}>
                    Tìm kiếm
                </Text>
            </Pressable>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
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
        borderColor: Colors.bodyText,
        borderWidth: 1,
        borderRadius: 6,
        // margin: 16,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 44,
        overflow: 'hidden',
        flex: 1,
    },
})
