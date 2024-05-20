import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, Stack } from 'expo-router'
import Colors from '@constants/Colors'
import { stackOptions } from '@configs/ScreenConfig'
import Button from '@components/View/Button'
import SpaceComponent from '@components/View/SpaceComponent'
import { useAppDispatch, useAppSelector } from '@redux/store'
import ImageComponent from '@components/View/ImageComponent'
import CreateThanhTichBottomSheet from '@components/ThanhTich/CreateThanhTichBottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import RowComponent from '@components/View/RowComponent'
import { deleteThanhTich } from '@services/thanhTichServices'
import { toast } from '@utils/toast'
import { doanhNghiepActions } from '@redux/doanhNghiepSlice'
import { ThanhTich } from '@constants/DoanhNghiep/DoanhNghiepTypes'

const ThanhTichDoanhNghiep = () => {
    const { doanhNghiep } = useAppSelector(state => state.doanhNghiep)
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const scrollRef = useRef<FlatList>(null)
    const dispatch = useAppDispatch()

    const handleDeleteThanhTich = async (id: number) => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa thành tích này?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: async () => {
                    const result = await deleteThanhTich(id)
                    if (result) {
                        toast('Xóa thành công')
                        const thanhTich = doanhNghiep?.thanhTich?.filter(item => item.id !== id) || []
                        dispatch(doanhNghiepActions.setThanhTichs(thanhTich))
                    }
                },
            },
        ])
    }

    const handleEditThanhTich = (item: ThanhTich) => {}

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Thành tích, chứng nhận',
                    ...stackOptions,
                }}
            />
            <SpaceComponent height={12} />
            <FlatList
                ref={scrollRef}
                data={doanhNghiep?.thanhTich || []}
                renderItem={({ item, index }) => (
                    <View style={thanhTichStyles.container}>
                        {item.hinhAnh && (
                            <ImageComponent uri={item.hinhAnh} width={'100%'} height={250} resizeMode='contain' />
                        )}
                        <Text>{item.tenThanhTich}</Text>
                        <RowComponent gap={12} styles={{ marginTop: 12 }}>
                            {/* <Button
                                btnStyles={{ flex: 1, backgroundColor: Colors.warning }}
                                text='Sửa'
                                onPress={() => handleEditThanhTich(item)}
                            /> */}
                            <Button
                                btnStyles={{ flex: 1, backgroundColor: Colors.error.default }}
                                text='Xóa'
                                onPress={() => handleDeleteThanhTich(item.id)}
                            />
                        </RowComponent>
                    </View>
                )}
                keyExtractor={item => item.id + ''}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.bottom}>
                <Button text='Thêm mới' onPress={() => bottomSheetRef.current?.present()} />
            </View>

            <CreateThanhTichBottomSheet ref={bottomSheetRef} onFinish={() => bottomSheetRef.current?.close()} />
        </View>
    )
}

export default ThanhTichDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
})

const thanhTichStyles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: 'white',
        marginBottom: 12,
        alignItems: 'center',
        marginHorizontal: 16,
        elevation: 10,
    },
    button: {
        flex: 1,
    },
})
