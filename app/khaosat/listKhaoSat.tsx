import React, { useEffect, useLayoutEffect } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useNavigation } from 'expo-router'
import { Text, View, Pressable, ScrollView, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { textStyles } from '@constants/Styles'
import Loading from '@components/StatusPage/Loading'
import PageHeader from '@components/View/PageHeader'
import { RootState, AppDispatch } from '@redux/store'
import { fetchDanhSachKhaoSat } from '@redux/khaoSatSlice'

const ListKhaoSat = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { khaoSats, loading } = useSelector((state: RootState) => state.khaoSat)

    useEffect(() => {
        dispatch(fetchDanhSachKhaoSat())
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }

    if (!loading && khaoSats.length === 0) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={textStyles.medium}>Không tìm thấy khảo sát nào</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <PageHeader title={'Tất cả khảo sát'} style={{ marginBottom: 12 }} />
            <ScrollView contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                {khaoSats.map(item => (
                    <Pressable
                        key={item.id}
                        onPress={() => router.push(`/khaosat/${item.id}`)}
                        style={styles.itemContainer}>
                        <View style={styles.itemInfo}>
                            <View style={{ flex: 1, gap: 6 }}>
                                <Text style={styles.title}>
                                    Khảo sát: #<Text style={{ color: Colors.default }}>{item.id}</Text>
                                </Text>
                                <Text style={styles.date}>
                                    <Text style={{ textTransform: 'capitalize' }}>
                                        {moment(item.createdAt).format('dddd, HH:mm, DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={styles.score}>{item.tongDiem} điểm</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default ListKhaoSat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginHorizontal: 16,
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        elevation: 6,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: Colors.textGray,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
