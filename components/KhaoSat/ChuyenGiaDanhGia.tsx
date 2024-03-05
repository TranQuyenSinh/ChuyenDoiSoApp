import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { khaoSatStyles } from './khaoSatStyles'
import { textStyles } from '@constants/Styles'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import { ChuyenGia } from '@constants/ChuyenGia/ChuyenGiaTypes'
import { useRouter } from 'expo-router'
import moment from 'moment'
import Seperator from '@components/View/Seperator'
import Colors from '@constants/Colors'

type ChuyenGiaDanhGiaProps = {
    chuyenGia?: ChuyenGia
    danhGia?: string
    deXuat?: string
    danhGiaAt?: string
}

const ChuyenGiaDanhGia = ({ chuyenGia, danhGia, deXuat, danhGiaAt }: ChuyenGiaDanhGiaProps) => {
    const router = useRouter()
    return (
        <>
            <Text style={khaoSatStyles.title}>Ý kiến chuyên gia</Text>
            <View style={[khaoSatStyles.container, { padding: 12 }]}>
                {chuyenGia && (
                    <>
                        {/* Chuyên gia Info */}
                        <Pressable
                            onPress={() => router.push(`/chuyengia/${chuyenGia?.id}`)}
                            style={styles.chuyengiaInfoContainer}>
                            <Image
                                source={chuyenGia.hinhAnh ? { uri: chuyenGia.hinhAnh } : no_avatar}
                                style={styles.chuyengiaAvatar}
                            />
                            <View>
                                <Text style={styles.chuyengiaTen}>Chuyên gia {chuyenGia.tenChuyenGia}</Text>
                                <Text>{moment(danhGiaAt).fromNow()}</Text>
                            </View>
                        </Pressable>
                        <Seperator style={{ marginHorizontal: 0, marginBottom: 0 }} />
                        {/* Đánh giá & đề xuất của chuyên gia */}
                        <View>
                            <Text style={styles.chuyengiaTitle}>Đánh giá:</Text>
                            <Text style={textStyles.longText}>{danhGia}</Text>
                            <Text style={styles.chuyengiaTitle}>Đề xuất:</Text>
                            <Text style={textStyles.longText}>{deXuat}</Text>
                        </View>
                    </>
                )}

                {!chuyenGia && (
                    <>
                        <Text style={[textStyles.medium, { textAlign: 'center' }]}>Chưa có ý kiến chuyên gia...</Text>
                    </>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    chuyengiaInfoContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    chuyengiaAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    chuyengiaTen: {
        fontSize: 18,
        fontWeight: '500',
    },
    chuyengiaDate: {
        color: Colors.textGray,
        fontSize: 16,
    },
    chuyengiaTitle: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 12,
    },
})

export default ChuyenGiaDanhGia
