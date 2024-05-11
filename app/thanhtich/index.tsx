import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router, Stack } from 'expo-router'
import Colors from '@constants/Colors'
import { stackOptions } from '@configs/ScreenConfig'
import Button from '@components/View/Button'
import SpaceComponent from '@components/View/SpaceComponent'
import { useAppSelector } from '@redux/store'
import ImageComponent from '@components/View/ImageComponent'
import CreateThanhTichBottomSheet from '@components/ThanhTich/CreateThanhTichBottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const ThanhTichDoanhNghiep = () => {
    const { doanhNghiep } = useAppSelector(state => state.doanhNghiep)
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const scrollRef = useRef<FlatList>(null)

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Thành tích doanh nghiệp',
                    ...stackOptions,
                }}
            />
            <SpaceComponent height={12} />
            <FlatList
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
                data={doanhNghiep?.thanhTich || []}
                renderItem={({ item }) => (
                    <View style={thanhTichStyles.container}>
                        <ImageComponent uri={item.hinhAnh} width={'100%'} height={300} resizeMode='contain' />
                        <Text>{item.tenThanhTich}</Text>
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
    },
})
