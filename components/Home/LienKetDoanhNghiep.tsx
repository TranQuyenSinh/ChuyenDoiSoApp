import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenWidth } from '@utils/window'
import { router } from 'expo-router'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghiepWebsite } from '@services/doanhNghiepServices'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { trungTamActions } from '@redux/trungTamSlice'
import { appIcons } from '@constants/Images'
const LienKetDoanhNghiep = () => {
    const [data, setData] = useState<DoanhNghiep[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const fetchData = async () => {
        const data = await getDoanhNghiepWebsite()
        setData(data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handlePress = (doanhNghiep: DoanhNghiep) => {
        dispatch(trungTamActions.selectChuongTrinh({ name: doanhNghiep.tenTiengViet, link: doanhNghiep.website }))
        router.push('/web')
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {data?.map(item => (
                <View key={item.id} style={styles.container}>
                    <Pressable onPress={() => handlePress(item)} style={styles.iconContainer}>
                        <Image
                            source={item.user?.image ? { uri: item.user.image } : appIcons.appLogo}
                            style={styles.icon}
                        />
                    </Pressable>
                    <Text numberOfLines={3} style={styles.text}>
                        {item.tenTiengViet}
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default LienKetDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        alignItems: 'center',
        width: screenWidth / 4,
        gap: 2,
        padding: 6,
        overflow: 'hidden',
    },
    iconContainer: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 2,
    },
    icon: {
        borderRadius: 50,
        width: 60,
        height: 60,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 10,
        textTransform: 'uppercase',
        flexShrink: 0,
        textAlign: 'center',
        fontWeight: '500',
    },
})
