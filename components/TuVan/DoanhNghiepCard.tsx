import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
//@ts-ignore
import no_avatar from '@assets/icons/user.jpg'
import { Image } from 'react-native'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import moment from 'moment'

interface DoanhNghiepCardProps {
    data: DoanhNghiep
}

const DoanhNghiepCard = ({ data }: DoanhNghiepCardProps) => {
    const mapPercentageToStars = useCallback((percentage: number = 0) => {
        const maxStars = 5
        const maxPercentage = 100
        const stars = Math.round((percentage / maxPercentage) * maxStars)
        return stars
    }, [])

    const khaoSatMoiNhat = data?.khaoSat?.slice?.()?.sort?.((a, b) => b.id - a.id)?.[0]
    const nhuCauMoiNhat = data?.nhuCau?.sort?.((a, b) => b.id - a.id)?.[0]
    return (
        <View style={styles.container}>
            <View style={topStyles.container}>
                <Image source={data?.user?.image ? { uri: data?.user?.image } : no_avatar} style={topStyles.image} />
                <View style={topStyles.info}>
                    <Text style={topStyles.name}>{data.tenTiengViet}</Text>
                    <Text style={topStyles.text}>Người đại diện: {data.daiDien?.tenDaiDien}</Text>
                    <Text style={topStyles.text}>
                        Ngày thành lập: {data.ngayLap ? moment(data.ngayLap).format('DD/MM/YYYY') : 'Chưa cập nhật'}
                    </Text>
                    <Text style={topStyles.text}>Loại hình kinh doanh: {data.loaiHinh?.tenLoaiHinh}</Text>
                    <Text style={topStyles.text}>Ngành nghề: {data.nganhNghe?.tenNganhNghe}</Text>
                </View>
            </View>
            {khaoSatMoiNhat && (
                <View style={centerStyles.container}>
                    <Text style={styles.title}>Kết quả đánh giá gần đây</Text>
                    <View style={centerStyles.row}>
                        <Text style={centerStyles.rowTitle}>Điểm đánh giá:</Text>
                        <Text style={centerStyles.rowText}>{khaoSatMoiNhat?.tongDiem}</Text>
                    </View>
                    <View style={centerStyles.row}>
                        <Text style={centerStyles.rowTitle}>Mức độ sẵn sàng CĐS:</Text>
                        <Text style={centerStyles.rowText}>{khaoSatMoiNhat?.mucDo?.tenMucDo}</Text>
                    </View>
                </View>
            )}

            {khaoSatMoiNhat?.ketQuaTruCots && (
                <View style={truCotStyles.container}>
                    <Text style={styles.title}>Đánh giá trên từng trụ cột</Text>
                    {khaoSatMoiNhat?.ketQuaTruCots?.map(item => (
                        <View key={item.id} style={centerStyles.row}>
                            <React.Fragment key={item.id}>
                                <Text style={centerStyles.rowTitle}>{item.tenTruCot}:</Text>
                                <View style={centerStyles.starContainer}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Ionicons
                                            key={index}
                                            name='star'
                                            size={12}
                                            color={
                                                index < mapPercentageToStars((item.phanTram / 16) * 100)
                                                    ? Colors.orange
                                                    : 'grey'
                                            }
                                        />
                                    ))}
                                </View>
                            </React.Fragment>
                        </View>
                    ))}
                </View>
            )}

            {/* {nhuCauMoiNhat && (
                <View style={bottomStyles.container}>
                    <Text style={styles.title}>Nhu cầu hiện nay</Text>
                    <Text style={bottomStyles.title}>Phần mềm</Text>
                    {nhuCauMoiNhat.nhuCau.split('; ').map(item => (
                        <Text key={item} style={bottomStyles.text}>
                            • {item}
                        </Text>
                    ))}
                    <Text style={[bottomStyles.title, { marginBottom: 2, marginTop: 6 }]}>Mong muốn cải thiện</Text>
                    {nhuCauMoiNhat.caiThien.split('; ').map(item => (
                        <Text key={item} style={bottomStyles.text}>
                            • {item}
                        </Text>
                    ))}
                </View>
            )} */}

            <View style={buttonStyles.container}>
                <Button
                    btnStyles={buttonStyles.button}
                    text='Xem chi tiết'
                    onPress={() => router.push(`/doanhnghiep/${data.id}`)}
                />
                <Button
                    btnStyles={[buttonStyles.button, { backgroundColor: Colors.orange }]}
                    text='Tư vấn'
                    onPress={() => router.push(`/chat/${data.user?.id}`)}
                />
            </View>
        </View>
    )
}

export default memo(DoanhNghiepCard)

const topStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        borderRadius: 50,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 4,
    },
    name: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#344049',
    },
    text: {
        fontSize: 12,
    },
})

const centerStyles = StyleSheet.create({
    container: {
        padding: 12,
        gap: 2,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    rowTitle: {
        fontSize: 12,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    rowText: {
        color: '#080808',
        fontWeight: '500',
        flexShrink: 1,
        textAlign: 'right',
        fontSize: 12,
    },
})

const truCotStyles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

const bottomStyles = StyleSheet.create({
    container: {
        padding: 12,
        gap: 2,
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
    },
    text: {
        fontSize: 12,
    },
})

const buttonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    },
})

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        overflow: 'hidden',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343c48',
        marginBottom: 6,
    },
})
