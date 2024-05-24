import { Alert, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { router, Stack } from 'expo-router'
import { stackOptions } from '@configs/ScreenConfig'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { ThacMac } from '@constants/CommonTypes/ThacMacType'
import { deleteThacMac, getThacMacOfUser } from '@services/thacMacServices'
import moment from 'moment'
import RowComponent from '@components/View/RowComponent'
import { Text } from '@components/View/Text'
import Filter, { FilterTypes } from '@components/ThacMac/Filter'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import CreateThacMacSheet from '@components/ThacMac/CreateThacMacSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useAppDispatch } from '@redux/store'
import { thacMacActions } from '@redux/thacMac.slice'

const stateBgColors = {
    waiting: '#d5d5d55c',
    answered: '#5cb85c31',
}

const ThacMacIndex = () => {
    const dispatch = useAppDispatch()
    const [thacMacs, setThacMacs] = useState<ThacMac[]>([])
    const [thacMacsFiltered, setThacMacsFiltered] = useState<ThacMac[]>([])
    const [filter, setFilter] = useState<FilterTypes>()
    const createSheetRef = useRef<BottomSheetModal>(null)
    const fetchData = async () => {
        const data = await getThacMacOfUser()
        setThacMacs(data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    useLayoutEffect(() => {
        if (filter) {
            const filteredData = thacMacs.filter(item => {
                if (filter === FilterTypes.ALL) return true
                return filter === FilterTypes.WAITING ? !item.ngayTraLoi : item.ngayTraLoi
            })
            setThacMacsFiltered(filteredData)
        }
    }, [filter, thacMacs])

    const handleDelete = async (item: ThacMac) => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa câu hỏi này?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: async () => {
                    const result = await deleteThacMac(item.id)
                    if (result) setThacMacs(thacMacs.filter(i => i.id !== item.id))
                },
            },
        ])
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Thắc mắc',
                    ...stackOptions,
                }}
            />
            <Filter onChangeValue={setFilter} />
            <FlatList
                data={thacMacsFiltered}
                contentContainerStyle={{ paddingBottom: 100 }}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={fetchData}
                renderItem={({ item }) => (
                    <Pressable
                        android_ripple={{ color: 'gray' }}
                        onPress={() => {
                            dispatch(thacMacActions.setThacMac(item))
                            router.push(`/thacmac/${item.id}`)
                        }}
                        onLongPress={() => handleDelete(item)}
                        style={[
                            itemStyles.container,
                            { backgroundColor: item.ngayTraLoi ? stateBgColors.answered : stateBgColors.waiting },
                        ]}>
                        <Text style={itemStyles.title}>
                            {item.noiDung.slice(0, 50)}
                            {item.noiDung?.length > 50 && '...'}
                        </Text>
                        <RowComponent justify='space-between'>
                            <Text style={itemStyles.date}>
                                {moment(item.createdAt).format('DD/MM/YYYY')} ({moment(item.createdAt).fromNow()})
                            </Text>
                            <Text color={item.ngayTraLoi ? 'green' : 'gray'}>
                                {item.ngayTraLoi ? 'Đã trả lời' : 'Đang xem xét'}
                            </Text>
                        </RowComponent>
                    </Pressable>
                )}
            />
            <Button
                textStyles={styles.buttonText}
                btnStyles={styles.button}
                text='Gửi thắc mắc'
                onPress={() => createSheetRef.current?.present()}
            />
            <CreateThacMacSheet
                ref={createSheetRef}
                onFinished={newItem => {
                    Alert.alert(
                        'Cảm ơn bạn đã đặt câu hỏi!',
                        `Câu hỏi của bạn đã được gửi thành công \nBạn sẽ nhận được thông báo khi có trả lời.`
                    )
                    setThacMacs([...thacMacs, newItem].sort((a, b) => b.id - a.id))
                    createSheetRef.current?.dismiss()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20,
        height: 50,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: Colors.orange,
    },
    buttonText: {
        fontFamily: 'mon-sb',
        fontSize: 15,
    },
})

const itemStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.textGray,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    state: {
        fontSize: 14,
    },
    date: {
        fontSize: 14,
    },
})

export default ThacMacIndex
