import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Colors from '@constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghieps } from '@services/doanhNghiepServices'
import { router } from 'expo-router'
import LinearGradient from 'react-native-linear-gradient'
import { Keyboard } from 'react-native'
import { Skeleton } from 'moti/skeleton'
import SpaceComponent from '@components/View/SpaceComponent'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { appIcons } from '@constants/Images'
const DoanhNghiepPage = () => {
    const [data, setData] = useState<DoanhNghiep[] | undefined>()
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<DoanhNghiep[] | undefined>()
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    useLayoutEffect(() => {
        let filteredData = data
        if (search !== '')
            filteredData = data?.filter(item => item.tenTiengViet.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(filteredData)
    }, [search])

    const fetchData = async () => {
        const data = await getDoanhNghieps()
        const dnHoiViens = data.filter(item => item.hoiVien)
        setData(dnHoiViens)
        setFilteredData(dnHoiViens)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#32acff', '#94d3fe']}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Thành viên Hiệp hội Doanh nghiệp</Text>
                            <Text style={styles.subTitle}>Hợp tác - Phát triển - Bền vững</Text>
                        </View>
                        <View style={searchStyles.container}>
                            <Ionicons name='search-outline' color={Colors.bodyText} size={20} />
                            <TextInput
                                value={search}
                                onChangeText={t => setSearch(t)}
                                placeholder='Tìm kiếm doanh nghiệp'
                                style={searchStyles.input}
                            />
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </LinearGradient>
            <View style={contentStyles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredData || Array.from({ length: 10 }).map(_ => null)}
                    numColumns={2}
                    keyExtractor={(item, index) => (item ? item.id + '' : index + '')}
                    renderItem={({ item }) => (
                        <>
                            {item ? (
                                <AnimatedPressable
                                    layout={Layout}
                                    entering={FadeIn.duration(800)}
                                    onPress={() => router.push(`/doanhnghiep/${item.id}`)}
                                    style={cardStyles.container}>
                                    <Image
                                        source={item.user?.image ? { uri: item.user.image } : appIcons.appLogo}
                                        style={cardStyles.logo}
                                    />
                                    <Text style={cardStyles.name}>{item.tenTiengViet}</Text>
                                </AnimatedPressable>
                            ) : (
                                <Pressable style={cardStyles.container}>
                                    <Skeleton width={'100%'} height={100} colorMode='light' radius={'square'} />
                                    <SpaceComponent height={20} />
                                    <Skeleton width={'100%'} height={20} colorMode='light' />
                                </Pressable>
                            )}
                        </>
                    )}
                />
            </View>
        </View>
    )
}

export default DoanhNghiepPage

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flex: 0.5,
        padding: 12,
        margin: 6,
    },
    logo: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 100,
    },
    name: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
        marginTop: 8,
    },
})

const contentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 12,
    },
})
const searchStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 12,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        elevation: 12,
        gap: 8,
        marginBottom: 18,
    },
    input: {
        color: Colors.bodyText,
        fontSize: 16,
        flex: 1,
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 20,
    },
    subTitle: {
        color: 'white',
        fontSize: 16,
    },
})
