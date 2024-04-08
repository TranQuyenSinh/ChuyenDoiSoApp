import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { DanhMucBaiViet } from '@constants/DienDan/DienDanTypes';
import Colors from '@constants/Colors';

interface CategoryTagProps {
    data: DanhMucBaiViet
    onPress: (item: DanhMucBaiViet) => void
    selected?: boolean
}

const CategoryTag = ({ data, onPress, selected = false }: CategoryTagProps) => {

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => onPress(data)} >
            <FontAwesome name='tag' color={selected ? Colors.default : 'lightgrey'} size={16} />
            <Text style={{ color: selected ? Colors.default : '#000' }}>{data.name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryTag;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'orange',
        backgroundColor: 'white',
        borderRadius: 6
    }
});
