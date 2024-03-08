import React, { memo, useState, useEffect } from 'react'

import { useRouter } from 'expo-router'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

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
        return <Loading containerStyles={{ width: 'auto' }} />
    }

    return (
        <View>
            {data.map(item => (
                <View key={item.id}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            router.push(`/news/${item.id}`)
                        }}
                        style={tinTucStyles.itemContainer}>
                        <Text style={tinTucStyles.title}>{item.tieuDe}</Text>
                        <Text numberOfLines={4} style={tinTucStyles.tomTat}>
                            {item.tomTat}
                        </Text>
                        <Image source={{ uri: item.hinhAnh }} style={tinTucStyles.image} />
                    </TouchableOpacity>
                    <Seperator style={{ marginHorizontal: 0, height: 1 }} />
                </View>
            ))}
        </View>
    )
}

export default TinXemNhieu
