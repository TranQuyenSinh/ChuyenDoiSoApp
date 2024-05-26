import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import RowComponent from '@components/View/RowComponent'
import ImageComponent from '@components/View/ImageComponent'
import Colors from '@constants/Colors'
import moment from 'moment'
import { iteratee } from 'lodash'
import { appIcons, appImages } from '@constants/Images'
import { router } from 'expo-router'

interface DoanhNghiepItemProps {
    doanhNghiep: DoanhNghiep
}

const DoanhNghiepItem = (props: DoanhNghiepItemProps) => {
    const { doanhNghiep } = props
    return (
        <Pressable android_ripple={{ color: 'gray' }} onPress={() => router.push(`/doanhnghiep/${doanhNghiep.id}`)}>
            <RowComponent gap={12} styles={styles.container}>
                <View style={styles.imageContainer}>
                    <ImageComponent uri={doanhNghiep.user?.image} style={styles.image} />
                    {doanhNghiep.hoiVien && (
                        <ImageComponent source={appIcons.premiumBorder} style={styles.imageBorder} />
                    )}
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{doanhNghiep.tenTiengViet}</Text>
                    {doanhNghiep.diaChi && <Text style={styles.time}>{doanhNghiep.diaChi}</Text>}
                    {doanhNghiep.sdt && <Text style={styles.time}>{doanhNghiep.sdt}</Text>}
                    {doanhNghiep.hoiVien && doanhNghiep.namGiaNhap && (
                        <Text style={styles.goldText}>
                            Ngày vào hội: {moment(doanhNghiep.namGiaNhap).format('DD/MM/YYYY')}
                        </Text>
                    )}
                </View>
            </RowComponent>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
    },
    imageContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
        borderRadius: 50,
        resizeMode: 'contain',
    },
    imageBorder: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    title: {
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: Colors.bodyText,
    },
    goldText: {
        color: Colors.orange,
        fontWeight: '500',
    },
})

export default DoanhNghiepItem
