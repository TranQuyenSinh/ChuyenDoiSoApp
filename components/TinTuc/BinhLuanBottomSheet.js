import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'

import moment from '@utils/moment'
import Colors from '@constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { textStyles, defaultStyles } from '@constants/Styles'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { themBinhLuan, fetchBinhLuan as fetchBinhLuanAction } from '@redux/tinTucSlice'
import { BottomSheetModal, BottomSheetBackdrop, useBottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import no_avatar from '@assets/icons/user.png'

import PhanHoiBottomSheet from './PhanHoiBottomSheet'

const BinhLuanBottomSheet = ({ isOpen, toggle }) => {
    const dispatch = useDispatch()
    const [isOpenReplyModal, setIsOpenReplyModal] = useState(false)

    const [comments, setComments] = useState([])
    const [cmtText, setCmtText] = useState('')
    const [replyCommentId, setReplyCommentId] = useState()
    const [replyComment, setReplyComment] = useState()

    const [refreshing, setRefreshing] = useState(false)

    const { tinTucId, binhLuans } = useSelector(state => state.tinTuc)

    const userStore = useSelector(state => state.user)
    const { isLoggedIn } = userStore

    const snapPoints = useMemo(() => ['90%'], [])
    const modalRef = useRef(null)
    // backdrop là lớp overlay
    const renderBackdrop = useCallback(
        props => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    )

    const { dismiss } = useBottomSheetModal()

    useEffect(() => {
        if (isOpen) modalRef.current?.present()
    }, [isOpen])

    const handleThemBinhLuan = async () => {
        if (!cmtText) return
        await dispatch(themBinhLuan({ noiDung: cmtText })).unwrap()
        setCmtText('')
        fetchBinhLuan()
    }
    const handleTraLoiBinhLuan = async binhLuanId => {
        setReplyCommentId(binhLuanId)
        setIsOpenReplyModal(true)
    }

    const fetchBinhLuan = async () => {
        setRefreshing(true)
        await dispatch(fetchBinhLuanAction()).unwrap()
        setRefreshing(false)
    }

    useEffect(() => {
        setComments(binhLuans)
    }, [binhLuans])

    useEffect(() => {
        setReplyComment(comments?.find(({ id }) => id === replyCommentId))
    }, [comments, replyCommentId])

    useEffect(() => {
        fetchBinhLuan()
    }, [tinTucId])

    const handleRefresh = useCallback(() => {
        fetchBinhLuan()
    }, [])

    return (
        <>
            <BottomSheetModal
                onDismiss={() => toggle(false)}
                ref={modalRef}
                overDragResistanceFactor={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ display: 'none' }}
                backgroundStyle={{ backgroundColor: Colors.lightGrey }}>
                <PhanHoiBottomSheet
                    isOpen={isOpenReplyModal}
                    toggle={setIsOpenReplyModal}
                    replyComment={replyComment}
                    dispatch={dispatch}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Pressable onPress={() => dismiss()} style={{ position: 'absolute', top: 0, left: 10 }}>
                            <Ionicons name='chevron-back' size={24} color={Colors.bodyText} />
                        </Pressable>
                        <Text style={styles.title}>Bình luận</Text>
                    </View>
                    {isLoggedIn && (
                        <>
                            <BottomSheetScrollView
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                style={{ marginTop: 16 }}
                                contentContainerStyle={{ gap: 25, paddingBottom: 80, paddingTop: 12 }}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}>
                                {comments?.length > 0 &&
                                    comments.map(item => (
                                        <View key={item.id} style={styles.commentContainer}>
                                            <Image
                                                source={item.avatar ? { uri: item.avatar } : no_avatar}
                                                style={styles.userAvatar}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.commentBox}>
                                                    <Text style={{ color: Colors.bodyText }}>{item.hoTen}</Text>
                                                    <Text>{item.noiDung}</Text>
                                                </View>
                                                <View style={styles.commentActions}>
                                                    <Text style={textStyles.mutedSmall}>
                                                        {moment(item.createdAt).fromNow()}
                                                    </Text>
                                                    <Pressable onPress={() => handleTraLoiBinhLuan(item.id)}>
                                                        <Text style={{ fontWeight: 'bold', fontFamily: 'mon-sb' }}>
                                                            Trả lời
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                                {item.phanHois?.length > 0 && (
                                                    <Pressable
                                                        onPress={() => handleTraLoiBinhLuan(item.id)}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            marginTop: 6,
                                                            marginStart: 6,
                                                        }}>
                                                        <MaterialIcons
                                                            name='subdirectory-arrow-right'
                                                            size={24}
                                                            color={Colors.bodyText}
                                                        />
                                                        <Text>Xem thêm ({item.phanHois.length}) phản hồi</Text>
                                                    </Pressable>
                                                )}
                                            </View>
                                        </View>
                                    ))}
                            </BottomSheetScrollView>
                            <View style={[defaultStyles.footer, styles.footer]}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={cmtText}
                                        onChangeText={text => setCmtText(text)}
                                        style={{ flex: 1, paddingHorizontal: 16 }}
                                        placeholder='Viết bình luận...'
                                    />
                                    <Pressable
                                        onPress={handleThemBinhLuan}
                                        style={[
                                            styles.sendBtn,
                                            { backgroundColor: cmtText ? Colors.default : Colors.bodyText },
                                        ]}>
                                        <Ionicons name='paper-plane-sharp' size={24} color={Colors.white} />
                                        <Text style={styles.sendBtnText}>Gửi</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </>
                    )}
                    {!isLoggedIn && <RequireLogin />}
                </View>
            </BottomSheetModal>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 20,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    commentContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    commentBox: {
        backgroundColor: Colors.white,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 14,
        elevation: 4,
        gap: 6,
    },
    commentActions: {
        flexDirection: 'row',
        gap: 14,
        marginTop: 8,
        marginLeft: 6,
    },
    footer: {
        height: 70,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: Colors.bodyText,
        borderWidth: StyleSheet.hairlineWidth,
    },
    sendBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        height: '100%',
    },
    sendBtnText: {
        color: Colors.white,
        fontFamily: 'mon-b',
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 4,
    },
})

export default BinhLuanBottomSheet
