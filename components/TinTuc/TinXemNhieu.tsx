import React, { memo, useState, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'

import Seperator from '@components/View/Seperator'
import Loading from '@components/StatusPage/Loading'
import { TinTuc } from '@constants/TinTuc/TinTucTypes'
import { getTinTucXemNhieu } from '@services/tinTucServices'

import { tinTucStyles } from './tinTucStyles'

const TinXemNhieu = () => {
    const router = useRouter()
    const [data, setData] = useState<TinTuc[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await getTinTucXemNhieu()
            setData(data)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <ActivityIndicator size={'large'} />
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
                        <Text style={tinTucStyles.title}>{item.tieuDe}</Text>

                        <Image source={{ uri: item.hinhAnh }} style={tinTucStyles.image} />
                    </Pressable>
                    <Seperator style={{ marginHorizontal: 0, height: 1 }} />
                </View>
            ))}
        </View>
    )
}

export default TinXemNhieu
