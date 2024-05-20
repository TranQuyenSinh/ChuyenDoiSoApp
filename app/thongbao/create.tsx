import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { stackOptions } from '@configs/ScreenConfig'
import { createThongBao } from '@services/thongBaoServices'
import { toast } from '@utils/toast'
import Button from '@components/View/Button'
import RowComponent from '@components/View/RowComponent'

const TaoThongBao = () => {
    const [tieuDe, setTieuDe] = useState('')
    const [noiDung, setNoiDung] = useState('')
    const handleCreate = async (type: 'all' | 'hoivien') => {
        const result = await createThongBao(tieuDe, noiDung, type)
        if (result) {
            toast('Tạo thông báo thành công')
            router.back()
        } else {
            toast('Có lỗi xảy ra')
        }
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Tạo thông báo',
                    animation: 'fade_from_bottom',
                    ...stackOptions,
                }}
            />
            <TextInput placeholder='Tiêu đề' value={tieuDe} onChangeText={t => setTieuDe(t)} style={styles.input} />
            <TextInput
                placeholder='Nội dung thông báo'
                value={noiDung}
                onChangeText={t => setNoiDung(t)}
                style={styles.input}
                numberOfLines={10}
                multiline
                textAlignVertical='top'
            />

            <Text style={styles.title}>Gửi đến:</Text>
            <RowComponent styles={styles.buttonRow}>
                <Button btnStyles={styles.button} onPress={() => handleCreate('all')} text='Tất cả doanh nghiệp' />
                <Button btnStyles={styles.button} onPress={() => handleCreate('hoivien')} text='Chỉ Hội viên' />
            </RowComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        gap: 12,
    },
    input: {
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        marginVertical: 4,
        marginHorizontal: 12,
        elevation: 12,
    },
    title: {
        fontWeight: '500',
        marginHorizontal: 12,
    },
    buttonRow: {
        marginHorizontal: 12,
        gap: 12,
    },
    button: {
        borderRadius: 30,
        flex: 1,
    },
})

export default TaoThongBao
