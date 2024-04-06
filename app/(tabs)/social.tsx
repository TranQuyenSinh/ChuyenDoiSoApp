import { FlatList, Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Colors from '@constants/Colors';
import TopSearch from '@components/DienDan/TopSearch';
import CategoryTag from '@components/DienDan/CategoryTag';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BaiViet, DanhMucBaiViet } from '@constants/DienDan/DienDanTypes';
import Post from '@components/DienDan/Post';
import { useNavigation } from 'expo-router';
import { ScreenStackHeaderRightView } from 'react-native-screens';

const SocialPage = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('');

    const categoryTag: DanhMucBaiViet = {
        id: 1,
        name: 'Cà phê'
    }
    const post: BaiViet = {
        id: 1,
        luotThich: 43,
        noiDung: 'NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng  NHững nhân tố quyết định khả năng cho trái của sầu riêng',
        luotXem: 337,
        user: {
            id: 1,
            email: 'sinh@gmail.com',
            name: 'Nguyễn Hữu Lễ',
            image: 'https://file3.qdnd.vn/data/images/0/2024/02/25/upload_2080/gia%20lua%20gao%20hom%20nay%2025-2.jpg?dpi=150&quality=100&w=870'
        },
        hinhAnhs: ['https://image.nhandan.vn/w800/Files/Images/2021/05/19/a1-1621390710942.JPG.webp'],
        createdAt: new Date(2024, 3, 3).toISOString(),
        danhMucs: [
            categoryTag
        ]
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: "test"
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <TopSearch value={search} onChangeText={(text) => setSearch(text)} />
            <ScrollView
                horizontal
                style={{ flexShrink: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.tagsContainer}>
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                    <CategoryTag data={categoryTag} onPress={(item) => console.log('===> item: ', item)} />
                </View>
            </ScrollView>

            <FlatList data={[post, post]}
                refreshing={false}
                onRefresh={() => { }}
                keyExtractor={(item, index) => index + ""}
                renderItem={({ item }) => <Post data={item} />}
            />
        </View>
    );
};

export default SocialPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 6,
        paddingHorizontal: 6,
        marginVertical: 6
    }
});
