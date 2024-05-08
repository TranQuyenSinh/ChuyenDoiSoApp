import { Alert, FlatList, Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { addAnhSanPham, deleteAnhSanPham, editSanPham, getSanPham } from '@services/sanPhamServices'
import { AnhSanPham } from '@constants/DoanhNghiep/SanPhamType'
//@ts-ignore
import PageHeader from '@components/View/PageHeader'
import { formatPrice } from '@utils/format'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { toast } from '@utils/toast'
import Loading from '@components/StatusPage/Loading'
import IconButton from '@components/View/IconButton'
//@ts-ignore
import no_image from '@assets/images/no_image.png'
import useToggle from '@hooks/useToggle'
import PickImageModal from '@components/View/PickImageModal'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import ChatMoTaSanPhamModal from '@components/SanPham/ChatMoTaSanPhamModal'
import BackgroundImage from '@components/View/BackgroundImage'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { doanhNghiepActions } from '@redux/doanhNghiepSlice'
const EditSanPham = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const { isOpen, toggle } = useToggle()
    const { isOpen: isOpenMoTa, toggle: toggleMoTa } = useToggle()
    const dispatch = useDispatch<AppDispatch>()
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
    })
    const [images, setImages] = useState<AnhSanPham[] | undefined>([])
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const data = await getSanPham(+id)
            setForm({
                name: data?.tenSanPham || '',
                price: data?.gia ? data.gia + '' : '',
                description: data?.moTa || '',
            })
            setImages(data?.hinhAnhs)
            setLoading(false)
        })()
    }, [id])

    const handleSelectImage = async (image: any) => {
        if (image) {
            setLoading(true)
            const result = await addAnhSanPham(+id, image)
            if (result) {
                setImages([...(images || []), result])
            } else {
                toast('Có lỗi xảy ra')
            }
            setLoading(false)
        }
    }

    const handleRemoveImage = async (anhdId: number) => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa ảnh này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                onPress: async () => {
                    setLoading(true)
                    const result = await deleteAnhSanPham(anhdId)
                    if (result) {
                        const hinhAnhs = images?.filter((p: AnhSanPham) => p.id !== anhdId)
                        setImages(hinhAnhs)
                    }
                    setLoading(false)
                },
            },
        ])
    }

    const handleTaoMoTa = async () => {
        const { name } = form
        if (!name) {
            toast('Vui lòng nhập tên sản phẩm')
            return
        }
        toggleMoTa(true)
    }

    const handleSend = async () => {
        const { name, price, description } = form
        if (!name || !price || !description) {
            toast('Vui lòng điền đầy đủ thông tin')
            return
        }
        setLoading(true)
        const products = await editSanPham(+id, name, price, description)
        if (products) {
            toast('Cập nhật sản phẩm thành công')
            dispatch(doanhNghiepActions.setSanPhams(products))

            router.back()
        } else {
            toast('Cập nhật sản phẩm thất bại')
        }
        setLoading(false)
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <PageHeader tintColor='white' title={'Đăng sản phẩm'} style={{ marginBottom: 12 }} />
            <BackgroundImage source={background} />
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={formStyles.container}>
                    <TextInput
                        value={form.name}
                        onChangeText={text => setForm({ ...form, name: text })}
                        placeholderTextColor={'white'}
                        cursorColor={'white'}
                        autoCapitalize='words'
                        style={formStyles.input}
                        placeholder='Tên sản phẩm'
                    />
                    <TextInput
                        value={formatPrice(form.price) + ''}
                        onChangeText={text => setForm({ ...form, price: text.replaceAll('.', '') })}
                        placeholderTextColor={'white'}
                        cursorColor={'white'}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        style={formStyles.input}
                        placeholder='Giá bán'
                    />
                    <TextInput
                        value={form.description}
                        onChangeText={text => setForm({ ...form, description: text })}
                        placeholderTextColor={'white'}
                        cursorColor={'white'}
                        style={formStyles.input}
                        placeholder='Mô tả sản phẩm'
                        textAlignVertical='top'
                        multiline
                        numberOfLines={6}
                    />
                    <Button text='Tạo mô tả sản phẩm bằng AI' onPress={handleTaoMoTa} />

                    <FlatList
                        scrollEnabled={false}
                        data={images}
                        numColumns={2}
                        contentContainerStyle={{ paddingHorizontal: 6, gap: 6, rowGap: 6 }}
                        keyExtractor={item => item.id + ''}
                        renderItem={({ item, index }) => (
                            <View style={imageStyles.container}>
                                <Image
                                    source={item.hinhAnh ? { uri: item.hinhAnh } : no_image}
                                    style={imageStyles.image}
                                />
                                <IconButton style={imageStyles.removeBtn} onPress={() => handleRemoveImage(item.id)}>
                                    <Ionicons name='close-circle' size={24} color={'grey'} />
                                </IconButton>
                            </View>
                        )}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Button
                            text='Thêm ảnh'
                            btnStyles={formStyles.button}
                            onPress={() => toggle(true)}
                            renderIcon={<FontAwesome name='plus' size={24} color='white' />}
                        />
                        <Button
                            text='Cập nhật'
                            btnStyles={[formStyles.button, { backgroundColor: '#00b157' }]}
                            onPress={handleSend}
                            renderIcon={<FontAwesome name='send' size={24} color='white' />}
                        />
                    </View>
                </View>
                <PickImageModal isOpen={isOpen} toggle={toggle} onPickAsync={handleSelectImage} />
                <ChatMoTaSanPhamModal
                    tenSanPham={form.name}
                    isOpen={isOpenMoTa}
                    toggle={toggleMoTa}
                    onAccept={moTa => setForm({ ...form, description: moTa })}
                />
            </ScrollView>
        </View>
    )
}

export default EditSanPham

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 12,
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    notfoundText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        paddingHorizontal: 16,
    },
    notfoundSubText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 16,
        marginTop: 12,
    },
    notfoundButton: {
        backgroundColor: Colors.orange,
        marginTop: 12,
    },
})

const formStyles = StyleSheet.create({
    container: {
        gap: 10,
        marginTop: 6,
        paddingHorizontal: 12,
    },
    inputContainer: {},
    input: {
        color: 'white',
        backgroundColor: '#0000003c',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: Colors.warning,
        marginTop: 12,
        flex: 1,
    },
})

const imageStyles = StyleSheet.create({
    container: {
        flex: 0.5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 6,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    removeBtn: {
        position: 'absolute',
        right: -12,
        top: 0,
        height: 50,
        width: 50,
        zIndex: 999,
    },
})
