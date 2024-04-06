import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface TopSearchProps {
    value: string
    onChangeText: (text: string) => void
}

const TopSearch = (props: TopSearchProps) => {
    const { value, onChangeText } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name='search-outline' size={16} color={'white'} />
                <TextInput cursorColor={'white'} value={value} onChangeText={onChangeText} placeholderTextColor={'white'} placeholder='Tìm kiếm' style={styles.input} />
                {value && <Pressable onPress={() => onChangeText('')}>
                    <Ionicons name='close-outline' size={20} color={'white'} />
                </Pressable>}
            </View>
        </SafeAreaView>
    );
};

export default TopSearch;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.default,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        backgroundColor: '#66a1ef',
        borderRadius: 24,
        marginHorizontal: 12,
        marginVertical: 12,
        paddingHorizontal: 12
    },
    input: {
        flex: 1,
        paddingVertical: 6,
        color: 'white',
    },
});
