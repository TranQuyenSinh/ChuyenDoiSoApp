import {
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Colors from '@constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { defaultStyles } from '@constants/Styles'
import Seperator from '@components/View/Seperator'
import { interpolate } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { windowWidth } from '@utils/window'
import { DoanhNghiep } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getDoanhNghieps } from '@services/doanhNghiepServices'
//@ts-ignore
import no_image from '@assets/images/no_image.png'
import ThongKeCDSPieChart from '@components/KhaoSat/ThongKe/ThongKeCDSPieChart'
import Button from '@components/View/Button'
import { router, useFocusEffect } from 'expo-router'
import BackgroundImage from '@components/View/BackgroundImage'
import LinearGradient from 'react-native-linear-gradient'
import { Keyboard } from 'react-native'
const DoanhNghiepPage = () => {
    const [data, setData] = useState<DoanhNghiep[]>([])
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<DoanhNghiep[]>([])

    useEffect(() => {
        let filteredData = data
        if (search !== '')
            filteredData = data.filter(item => item.tenTiengViet.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(filteredData)
    }, [search])

    const fetchData = async () => {
        const data = await getDoanhNghieps()
        setData(data)
        setFilteredData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        // <StatusBar barStyle='light-content' />
        <View style={styles.container}>
            <LinearGradient colors={['#32acff', '#94d3fe']}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Kết nối doanh nghiệp</Text>
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
                    data={filteredData}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id + ''}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push(`/doanhnghiep/${item.id}`)} style={cardStyles.container}>
                            <Image
                                source={item.user?.image ? { uri: item.user.image } : no_image}
                                style={cardStyles.logo}
                            />
                            <Text style={cardStyles.name}>{item.tenTiengViet}</Text>
                        </Pressable>
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
        width: '100%',
        height: 100,
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
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
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
