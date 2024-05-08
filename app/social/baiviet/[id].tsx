import {
    Image,
    KeyboardAvoidingView,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { BaiViet, BinhLuanBaiViet } from '@constants/DienDan/DienDanTypes'
import Post from '@components/DienDan/Post'
import { Ionicons } from '@expo/vector-icons'
import PostComment from '@components/DienDan/PostComment'
import { getBaiViet, getBinhLuans, postBinhLuan } from '@services/dienDanServices'
import NotFound from '@components/StatusPage/NotFound'
import Loading from '@components/StatusPage/Loading'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import IconButton from '@components/View/IconButton'
// @ts-ignore
import userImage from '@assets/icons/user.jpg'
import Colors from '@constants/Colors'
import { toast } from '@utils/toast'

const PostDetail = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState<BaiViet>()
    const [comments, setComments] = useState<BinhLuanBaiViet[]>([])
    const { userProfile } = useSelector((state: RootState) => state.user)
    const [text, setText] = useState('')

    const fetchData = async () => {
        setLoading(true)
        const post = await getBaiViet(+id)
        setPost(post)
        const comments = await getBinhLuans(+id)
        setComments(comments)
        setLoading(false)
    }

    const handleAddBinhLuan = async () => {
        if (text.length === 0) {
            toast('Vui lòng nhập nội dung bình luận')
            return
        }
        const binhLuansMoi = await postBinhLuan(+id, text)
        setComments(binhLuansMoi)

        setText('')
    }

    const handleAddReply = (newComments: BinhLuanBaiViet[]) => {
        setComments(newComments)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Bình luận',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    if (loading) return <Loading />

    if (!post) return <NotFound message='Không tìm thấy bài viết' />

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 75 }}
                style={styles.container}>
                {/* BÀI VIẾT */}
                <Post data={post} />
                <View style={bottomStyles.container}>
                    <Image
                        source={userProfile?.image ? { uri: userProfile?.image } : userImage}
                        style={bottomStyles.image}
                    />
                    <View style={bottomStyles.inputContainer}>
                        <TextInput
                            style={bottomStyles.input}
                            value={text}
                            onChangeText={text => setText(text)}
                            placeholder='Nhập bình luận...'
                        />
                        <IconButton onPress={handleAddBinhLuan}>
                            <Ionicons name='send' size={20} color={text.length === 0 ? 'grey' : Colors.default} />
                        </IconButton>
                    </View>
                </View>

                {/* SORT */}
                <Text style={styles.sortText}>Tất cả bình luận</Text>

                {/* COMMENT LIST */}
                {comments.map((comment, index) => (
                    <PostComment onPostBinhLuan={handleAddReply} key={comment.id} data={comment} />
                ))}
            </ScrollView>

            <StatusBar barStyle={'light-content'} />
        </KeyboardAvoidingView>
    )
}

export default PostDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    sortButton: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    sortText: {
        fontWeight: '500',
        marginVertical: 12,
        marginHorizontal: 16,
    },
})

const bottomStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        flex: 1,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        padding: 6,
    },
    input: {
        flex: 1,
        paddingHorizontal: 6,
    },
})
