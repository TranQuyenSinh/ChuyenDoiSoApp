import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import TabPageHeader from '@components/View/TabPageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { getLinhVucs } from '@services/tinTucServices'
import { getChuyenGias } from '@services/chuyenGiaServices'
import Modal from '@components/View/Modal'
import Loading from '@components/StatusPage/Loading'
import { screenHeight, windowHeight } from '@utils/window'

const Page = () => {
    const [linhVuc, setLinhVuc] = useState([])
    const [linhVucSelected, setLinhVucSelected] = useState(null)
    const [chuyenGias, setChuyenGias] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [chuyenGiaSelected, setChuyenGiaSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const fetchData = async () => {
        setLoading(true)
        let data = await getLinhVucs()
        setLinhVuc(data)
        setLinhVucSelected(data[0])
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            if (linhVucSelected?.id) {
                const data = await getChuyenGias(linhVucSelected.id)
                setChuyenGias(data)
            }
            setLoading(false)
        })()
    }, [linhVucSelected])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TabPageHeader title={'Chuyên gia tư vấn'} />
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
                                {item.tenlinhvuc}
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
                                        setChuyenGiaSelected(item)
                                        toggleModal()
                                    }}
                                    key={item.id}
                                    style={styles.chuyenGiaItem}>
                                    <Image source={{ uri: item.hinhAnh }} style={styles.anhDaiDien} />
                                    <View style={{ gap: 3 }}>
                                        <Text style={styles.hoTen}>{item.tenChuyenGia}</Text>
                                        <Text>Email: {item.email}</Text>
                                        <Text>Số điện thoại: {item.sdt}</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                        <Modal showCloseIcon={true} isOpen={isOpenModal} toggle={toggleModal}>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <Image source={{ uri: chuyenGiaSelected?.hinhAnh }} style={styles.anhDaiDien} />
                                <View style={{ gap: 3 }}>
                                    <Text style={styles.hoTen}>{chuyenGiaSelected?.tenChuyenGia}</Text>
                                    <Text>Email: {chuyenGiaSelected?.email}</Text>
                                    <Text>Số điện thoại: {chuyenGiaSelected?.sdt}</Text>
                                    <Text>Lĩnh vực: {chuyenGiaSelected?.linhVuc?.tenLinhVuc}</Text>
                                </View>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 12 }}>
                                <Pressable>
                                    <Text style={{ fontSize: 16, textAlign: 'justify', lineHeight: 24 }}>
                                        {chuyenGiaSelected?.moTa}
                                    </Text>
                                </Pressable>
                            </ScrollView>
                        </Modal>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
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
        resizeMode: 'center',
    },
})

export default Page
