import React, { useState, useEffect, useLayoutEffect } from 'react'

import Pdf from 'react-native-pdf'
import ReactNativeBlobUtil from 'react-native-blob-util'
import { View, Share, Platform, StyleSheet } from 'react-native'
import { useNavigation, useLocalSearchParams } from 'expo-router'

import { toast } from '@utils/toast'
import { MaterialIcons } from '@expo/vector-icons'
import Loading from '@components/StatusPage/Loading'
import IconButton from '@components/View/IconButton'
import { getThuVien } from '@services/commonServices'
import { ThuVien } from '@constants/TinTuc/ThuVienTypes'
import { windowWidth, windowHeight } from '@utils/window'
import PageHeader from '@components/View/PageHeader'
const ChiTietThuVien = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()
    const [data, setData] = useState<ThuVien>()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        const data = await getThuVien(+id)
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const downloadFile = () => {
        const source = data?.url
        if (!source) return
        let dirs = ReactNativeBlobUtil.fs.dirs
        ReactNativeBlobUtil.config({
            fileCache: true,
            appendExt: 'pdf',
            path: `${dirs.DocumentDir}/${data.file}`,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: data.file,
                description: 'Tài liệu chuyển đổi số.',
                mime: 'application/pdf',
            },
        })
            .fetch('GET', data.url)
            .then(res => {
                if (Platform.OS === 'ios') {
                    const filePath = res.path()
                    let options = {
                        type: 'application/pdf',
                        url: filePath,
                        saveToFiles: true,
                    }
                    Share.share(options)
                        .then(resp => console.log(resp))
                        .catch(err => console.log(err))
                }
                toast('Đã lưu tài liệu thành công')
            })
            .catch(err => console.log('BLOB ERROR -> ', err))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
        })
    }, [navigation])

    if (loading) return <Loading />

    return (
        <View style={styles.container}>
            <PageHeader
                title='Tài liệu'
                rightItem={
                    <IconButton onPress={downloadFile}>
                        <MaterialIcons name='file-download' size={24} color='black' />
                    </IconButton>
                }
            />
            <Pdf trustAllCerts={false} source={{ uri: data?.url }} style={styles.pdf} />
        </View>
    )
}

export default ChiTietThuVien

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    pdf: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        marginTop: 12,
    },
})
