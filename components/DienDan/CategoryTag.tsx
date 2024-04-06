import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { DanhMucBaiViet } from '@constants/DienDan/DienDanTypes';

interface CategoryTagProps {
    data: DanhMucBaiViet
    onPress: (item: DanhMucBaiViet) => void
}

const CategoryTag = ({ data, onPress }: CategoryTagProps) => {

    return (
        <TouchableOpacity onPress={() => onPress(data)} style={styles.container}>
            <FontAwesome name='tag' color={'lightgrey'} size={16} />
            <Text>{data.name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryTag;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'orange',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 6
    }
});
