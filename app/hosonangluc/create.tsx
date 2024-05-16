import { Platform, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '@utils/window'
import Pdf from 'react-native-pdf'
import { useAppDispatch, useAppSelector } from '@redux/store'
import NotFound from '@components/StatusPage/NotFound'
import { Stack } from 'expo-router'
import { stackOptions } from '@configs/ScreenConfig'
import DocumentPicker, { types } from 'react-native-document-picker'
import Button from '@components/View/Button'
import { createHoSoNangLuc } from '@services/doanhNghiepServices'
import { doanhNghiepActions } from '@redux/doanhNghiepSlice'
import { toast } from '@utils/toast'
import Loading from '@components/StatusPage/Loading'

const CreateHoSoNangLuc = () => {
    const { doanhNghiep } = useAppSelector(state => state.doanhNghiep)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const handlePickDoc = async () => {
        const file = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: [types.pdf],
        })
        if (file && file[0]) {
            setLoading(true)
            const uploadFile = {
                uri: Platform.OS === 'android' ? file[0].uri : file[0].uri.replace('file://', ''),
                name: file[0]?.name,
                type: file[0]?.type,
            }
            const url = await createHoSoNangLuc(uploadFile)
            if (url) {
                toast('Cập nhật thành công')
                dispatch(doanhNghiepActions.setHoSoNangLuc(url))
            } else toast('Có lỗi xảy ra')
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Hồ sơ năng lực',
                    ...stackOptions,
                }}
            />
            {loading && <Loading />}
            {doanhNghiep?.hoSoNangLuc ? (
                <View style={{ flex: 1 }}>
                    <Pdf trustAllCerts={false} source={{ uri: doanhNghiep.hoSoNangLuc }} style={styles.pdf} />
                    <Button text='Cập nhật' btnStyles={styles.button} onPress={handlePickDoc} />
                </View>
            ) : (
                <NotFound btnText='Cập nhật' onPress={handlePickDoc} message='Bạn chưa cập nhật hồ sơ năng lực' />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 10,
    },
})

export default CreateHoSoNangLuc
