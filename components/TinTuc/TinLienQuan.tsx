import React, { memo, useState, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'

import Seperator from '@components/View/Seperator'
import Loading from '@components/StatusPage/Loading'
import { TinTuc } from '@constants/TinTuc/TinTucTypes'
import { getTinTucLienQuan, getTinTucXemNhieu } from '@services/tinTucServices'

import { tinTucStyles } from './tinTucStyles'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { tagStyles } from '@configs/newsHtmlConfig'
import RenderHTML from 'react-native-render-html'
import { windowWidth } from '@utils/window'

const TinLienQuan = () => {
    const router = useRouter()
    const [data, setData] = useState<TinTuc[]>([])
    const [loading, setLoading] = useState(false)
    const { tinTucId } = useSelector((state: RootState) => state.tinTuc)

    useEffect(() => {
        ;(async () => {
            if (tinTucId) {
                setLoading(true)
                const data = await getTinTucLienQuan(tinTucId)
                setData(data)
                setLoading(false)
            }
        })()
    }, [tinTucId])

    if (loading) {
        return <Loading containerStyles={{ width: 'auto' }} />
    }
    return (
        <View>
            {data.map(item => (
                <View key={item.id}>
                    <Pressable
                        android_ripple={{ color: 'gray' }}
                        onPress={() => {
                            router.push(`/news/${item.id}`)
                        }}
                        style={tinTucStyles.itemContainer}>
                        <>
                            <Text style={tinTucStyles.title}>{item.tieuDe}</Text>
                            <Image source={{ uri: item.hinhAnh }} style={tinTucStyles.image} />
                        </>
                    </Pressable>
                    <Seperator style={{ marginHorizontal: 0, height: 1 }} />
                </View>
            ))}
        </View>
    )
}

export default TinLienQuan
