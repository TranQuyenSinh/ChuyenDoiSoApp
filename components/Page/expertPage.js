import { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, Image, Pressable, ScrollView } from 'react-native'

import Colors from '@constants/Colors'
import Modal from '@components/View/Modal'
import Loading from '@components/StatusPage/Loading'
import { getLinhVucs } from '@services/tinTucServices'
import TabPageHeader from '@components/View/TabPageHeader'
import { getChuyenGias } from '@services/chuyenGiaServices'
import no_avatar from '@assets/icons/user.jpg'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ExperPage = () => {
    const [linhVuc, setLinhVuc] = useState([])
    const [linhVucSelected, setLinhVucSelected] = useState(null)
    const [chuyenGias, setChuyenGias] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchLinhVucs = async () => {
        setLoading(true)
        let data = await getLinhVucs()
        setLinhVuc(data)
        setLinhVucSelected(data[0])
        setLoading(false)
    }

    const fetchChuyenGiasByLinhVuc = async linhVucId => {
        setLoading(true)
        const data = await getChuyenGias(linhVucId)
        setChuyenGias(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchLinhVucs()
    }, [])
    useEffect(() => {
        if (linhVucSelected?.id) {
            fetchChuyenGiasByLinhVuc(linhVucSelected?.id)
        }
    }, [linhVucSelected])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Lĩnh vực */}
                <ScrollView
                    style={{ gap: 4, paddingTop: 16 }}
                    contentContainerStyle={{ gap: 6, paddingHorizontal: 16 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {linhVuc?.map(item => (
                        <Pressable
                            key={item.id}
                            style={{
                                minWidth: 50,
                                backgroundColor: linhVucSelected?.id === item.id ? '#0073ffb1' : Colors.textGray,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 12,
                            }}
                            onPress={() => setLinhVucSelected(item)}>
                            <Text
                                style={{
                                    color: Colors.white,
                                    fontSize: 14,
                                }}>
                                {item.tenLinhVuc}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {loading && <Loading containerStyles={{ marginTop: 30, backgroundColor: 'transparent' }} />}
                {!loading && (
                    <>
                        <View style={styles.listContainer}>
                            {chuyenGias?.map(item => (
                                <Pressable
                                    onPress={() => {
                                        router.push(`/chuyengia/${item.id}`)
                                    }}
                                    key={item.id}
                                    style={styles.chuyenGiaItem}>
                                    <Image
                                        source={item?.hinhAnh ? { uri: item?.hinhAnh } : no_avatar}
                                        style={styles.anhDaiDien}
                                    />
                                    <View style={{ gap: 3 }}>
                                        <Text style={styles.hoTen}>{item.tenChuyenGia}</Text>
                                        <Text>
                                            <Ionicons name='call-sharp' size={20} color={Colors.success} /> {item.email}
                                        </Text>
                                        <Text>
                                            <Ionicons name='mail-open-outline' size={20} color={Colors.success} />{' '}
                                            {item.sdt}
                                        </Text>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    listContainer: {
        marginTop: 16,
        gap: 16,
        paddingHorizontal: 16,
    },
    chuyenGiaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    hoTen: {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: '800',
        color: '#eb8d1f',
    },
    anhDaiDien: {
        width: 100,
        height: 100,
        borderRadius: 4,
        resizeMode: 'cover',
    },
})

export default ExperPage
