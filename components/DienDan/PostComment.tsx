import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { BinhLuanBaiViet } from '@constants/DienDan/DienDanTypes'
import { router } from 'expo-router'
import IconButton from '@components/View/IconButton'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
// @ts-ignore
import userImage from '@assets/icons/user.jpg'
import { postBinhLuan } from '@services/dienDanServices'
import { toast } from '@utils/toast'
import Colors from '@constants/Colors'
interface PostCommentProps {
    data: BinhLuanBaiViet
    onPostBinhLuan: (binhLuansMoi: BinhLuanBaiViet[]) => void
}

const PostComment = ({ data, onPostBinhLuan }: PostCommentProps) => {
    const [open, setOpen] = useState(false)
    const [openBinhLuan, setOpenBinhLuan] = useState(false)

    const { userProfile } = useSelector((state: RootState) => state.user)
    const [text, setText] = useState('')
    const inputRef = useRef<TextInput>(null)

    const handleAddBinhLuan = async () => {
        if (text.length === 0) {
            toast('Vui lòng nhập nội dung bình luận')
            return
        }
        const binhLuansMoi = await postBinhLuan(data.baiVietId, text, data.id)
        onPostBinhLuan(binhLuansMoi)
        // setComments(binhLuansMoi)

        setText('')
    }

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    return (
        <View style={styles.container}>
            <View style={styles.commentTop}>
                <Image style={styles.image} source={{ uri: data.user.image }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{data.user.name}</Text>
                    <View style={styles.timeContainer}>
                        <Ionicons name='time-outline' size={10} color={'orange'} />
                        <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
                    </View>
                    <Text style={styles.commentText}>{data.noiDung}</Text>
                </View>
            </View>
            {open && (
                <View style={styles.commentCenter}>
                    <View style={bottomStyles.container}>
                        <View style={bottomStyles.inputContainer}>
                            <TextInput
                                ref={inputRef}
                                style={bottomStyles.input}
                                value={text}
                                onChangeText={text => setText(text)}
                                placeholder='Viết trả lời...'
                            />
                            <IconButton onPress={handleAddBinhLuan}>
                                <Ionicons name='send' size={20} color={text.length === 0 ? 'grey' : Colors.default} />
                            </IconButton>
                        </View>
                    </View>
                </View>
            )}
            {openBinhLuan &&
                data.phanHois?.map(phanhoi => (
                    <View key={phanhoi.id} style={[styles.commentTop, { marginLeft: 60 }]}>
                        <Image style={styles.image} source={{ uri: phanhoi.user.image }} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{phanhoi.user.name}</Text>
                            <View style={styles.timeContainer}>
                                <Ionicons name='time-outline' size={10} color={'orange'} />
                                <Text style={styles.time}>{moment(phanhoi.createdAt).fromNow()}</Text>
                            </View>
                            <Text style={styles.commentText}>{phanhoi.noiDung}</Text>
                        </View>
                    </View>
                ))}
            <View style={styles.commentBottom}>
                <Pressable
                    onPress={() => setOpen(!open)}
                    android_ripple={{ color: 'grey' }}
                    style={styles.actionButton}>
                    <FontAwesome name='comment' size={16} color={'grey'} />
                    <Text style={styles.actionText}>Trả lời</Text>
                </Pressable>
                <Pressable
                    onPress={() => setOpenBinhLuan(!openBinhLuan)}
                    android_ripple={{ color: 'grey' }}
                    style={styles.actionButton}>
                    <FontAwesome
                        name='comments'
                        size={16}
                        color={data.phanHois.length !== 0 ? Colors.default : 'grey'}
                    />
                    <Text style={[styles.actionText, data.phanHois.length !== 0 && { color: Colors.default }]}>
                        Bình luận {data.phanHois.length !== 0 ? `(${data?.phanHois?.length})` : ''}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({
    container: {
        gap: 6,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    commentTop: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        paddingBottom: 0,
    },
    commentCenter: {},
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    info: {
        gap: 2,
    },
    name: {
        fontWeight: '500',
    },
    timeContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    time: {
        color: 'grey',
        fontSize: 10,
    },
    commentText: {
        lineHeight: 20,
        marginTop: 6,
    },
    commentBottom: {
        borderTopColor: 'grey',
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
    },
})

const bottomStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingVertical: 6,
    },
    image: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        flex: 1,
        marginLeft: 60,
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
