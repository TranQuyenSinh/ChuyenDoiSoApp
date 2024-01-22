import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import Colors from '@constants/Colors'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { defaultStyles, textStyles } from '@constants/Styles'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import moment from '@utils/moment'
import tinTucSlice, { themBinhLuan, fetchBinhLuan as fetchBinhLuanAction } from '@redux/tinTucSlice'

const PhanHoiBottomSheet = ({ isOpen, toggle, replyComment, dispatch }) => {
    const [cmtText, setCmtText] = useState('')

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
        console.log('===> bắt đấu them binh luan noi dung la: ', cmtText)
        if (!cmtText) return
        await dispatch(themBinhLuan({ noiDung: cmtText, binhLuanChaId: replyComment.id })).unwrap()
        setCmtText('')
        await dispatch(fetchBinhLuanAction()).unwrap()
    }

    return (
        <BottomSheetModal
            ref={modalRef}
            onDismiss={() => toggle(false)}
            overDragResistanceFactor={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: Colors.lightGrey }}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Pressable onPress={() => dismiss()} style={{ position: 'absolute', top: 0, left: 10 }}>
                        <Ionicons name='chevron-back' size={24} color={Colors.bodyText} />
                    </Pressable>
                    <Text style={styles.title}>
                        Phản hồi<> </>
                        <Text style={{ color: Colors.textGray }}>({replyComment?.phanHois?.length})</Text>
                    </Text>
                </View>
                <BottomSheetScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ gap: 25, paddingBottom: 80 }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    refreshControl={() => {
                        console.log('===> refresh')
                    }}>
                    {replyComment && (
                        <View style={styles.commentContainer}>
                            <View style={styles.commentBox}>
                                <Text style={{ color: Colors.bodyText }}>{replyComment.hoTen}</Text>
                                <Text>{replyComment.noiDung}</Text>
                            </View>
                            <View style={styles.commentActions}>
                                <Text style={textStyles.mutedSmall}>{moment(replyComment.createdAt).fromNow()}</Text>
                            </View>
                        </View>
                    )}
                    {replyComment?.phanHois?.length > 0 &&
                        replyComment.phanHois.map(item => (
                            <View key={item.id} style={[styles.commentContainer, { paddingStart: 50 }]}>
                                <View style={styles.commentBox}>
                                    <Text style={{ color: Colors.bodyText }}>{item.hoTen}</Text>
                                    <Text>{item.noiDung}</Text>
                                </View>
                                <View style={styles.commentActions}>
                                    <Text style={textStyles.mutedSmall}>{moment(item.createdAt).fromNow()}</Text>
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
                            style={[styles.sendBtn, { backgroundColor: cmtText ? Colors.default : Colors.bodyText }]}>
                            <Ionicons name='paper-plane-sharp' size={24} color={Colors.white} />
                            <Text style={styles.sendBtnText}>Gửi</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </BottomSheetModal>
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
})

export default PhanHoiBottomSheet
