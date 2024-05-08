import React, { useLayoutEffect, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { View, StyleSheet, Alert, ScrollView } from 'react-native'
import { useNavigation } from 'expo-router'

import { RootState } from '@redux/store'
import PageHeader from '@components/View/PageHeader'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import Loading from '@components/StatusPage/Loading'
import BackgroundImage from '@components/View/BackgroundImage'
import { toast } from '@utils/toast'
import { BaiViet } from '@constants/DienDan/DienDanTypes'
import { deleteBaiViet, getBaiVietsByUser } from '@services/dienDanServices'
import Post from '@components/DienDan/Post'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
import NotFound from '@components/StatusPage/NotFound'

const QuanLyBaiViet = () => {
    const navigation = useNavigation()
    const [posts, setPosts] = useState<BaiViet[]>([])
    const [loading, setLoading] = useState(false)
    const { userProfile } = useSelector((state: RootState) => state.user)

    const fetchData = async (id: number) => {
        setLoading(true)
        const data = await getBaiVietsByUser(id)
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        if (userProfile?.id) fetchData(userProfile?.id)
    }, [userProfile])

    const handleDelete = async (item: BaiViet) => {
        Alert.alert(
            'Lưu ý',
            'Bạn có chắc muốn xóa bài viết này?',
            [
                {
                    text: 'Hủy bỏ',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const result = await deleteBaiViet(item.id)
                        if (result) {
                            toast('Xóa bài viết thành công')
                            setPosts(posts.filter(p => p.id !== item.id))
                        }
                    },
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Bài viết của bạn'} style={{ marginBottom: 12 }} />
            <BackgroundImage source={background} blurRadius={10} />
            {loading && <Loading />}
            {!loading && posts?.length === 0 && <NotFound message='Chưa có bài viết nào' />}
            {posts?.length !== 0 && (
                <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                    {posts?.map(item => (
                        <View key={item.id} style={styles.postContainer}>
                            <IconButton onPress={() => handleDelete(item)} style={styles.deleteBtnContainer}>
                                <Ionicons name='close-circle-sharp' color={'grey'} size={24} />
                            </IconButton>
                            <Post data={item} />
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

export default QuanLyBaiViet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    postContainer: {},
    deleteBtnContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
    },
    listContainer: {
        marginHorizontal: 10,
    },
})
