import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Accordion from '@components/View/Accordion'
import { HiepHoi } from '@constants/HiepHoiDoanhNghiep/HiepHoiDoanhNghiepTypes'

type Props = {
    hiepHoiItem: HiepHoi
}
const HiepHoiAccordion = ({ hiepHoiItem }: Props) => {
    return (
        <Accordion title={hiepHoiItem.tenTiengViet}>
            <View style={styles.accordionContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>
                        Tên tiếng anh: <Text style={styles.itemText}>{hiepHoiItem.tenTiengAnh}</Text>
                    </Text>
                </View>
                {hiepHoiItem.sdt && (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>
                            Số điện thoại liên hệ: <Text style={styles.itemText}>{hiepHoiItem.sdt}</Text>
                        </Text>
                    </View>
                )}
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>
                        Địa chỉ trụ sở: <Text style={styles.itemText}>{hiepHoiItem.diaChi}</Text>
                    </Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>
                        Tên người đại diện: <Text style={styles.itemText}>{hiepHoiItem.daiDien?.tenDaiDien}</Text>
                    </Text>
                </View>
                {hiepHoiItem.daiDien?.email && (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>
                            Email người đại diện: <Text style={styles.itemText}>{hiepHoiItem.daiDien?.email}</Text>
                        </Text>
                    </View>
                )}
                {hiepHoiItem.daiDien?.sdt && (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>
                            Số điện thoại người đại diện:{' '}
                            <Text style={styles.itemText}>{hiepHoiItem.daiDien?.sdt}</Text>
                        </Text>
                    </View>
                )}
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>
                        Giới thiệu về tổ chức: <Text style={styles.itemText}>{hiepHoiItem.moTa}</Text>
                    </Text>
                </View>
            </View>
        </Accordion>
    )
}

export default HiepHoiAccordion

const styles = StyleSheet.create({
    accordionContainer: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        gap: 8,
    },
    itemContainer: {},
    itemTitle: {
        lineHeight: 22,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    itemText: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: 'normal',
    },
})
