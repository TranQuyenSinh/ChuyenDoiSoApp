import { FlatList, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { createSanPham, editSanPham, getSanPham } from '@services/sanPhamServices'
import { AnhSanPham, SanPham } from '@constants/DoanhNghiep/SanPhamType'
import BackgroundImage from '@components/View/BackgroundImage'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import PageHeader from '@components/View/PageHeader'
import { formatPrice } from '@utils/format'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { toast } from '@utils/toast'
import useChonAnh from '@hooks/useChonAnh'
import Loading from '@components/StatusPage/Loading'
const EditSanPham = () => {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    })
    const { pickImageAsync } = useChonAnh()
    const [pickImage, setPickImage] = useState<any>()
    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const data = await getSanPham(+id)
            setForm({
                name: data?.tenSanPham || '',
                price: data?.gia ? data.gia + "" : '',
                description: data?.moTa || "",
                image: data?.hinhAnhs[0]?.hinhAnh || ''
            })
            setLoading(false)
            console.log('===> : ', data?.hinhAnhs[0]?.hinhAnh);
        })()
    }, [id])
    const handleSelectImage = async () => {
        const data = await pickImageAsync('galery', false)
        if (data) {
            // setImages([...images, data])
            setPickImage(data)
        }
    }

    const handleRemoveImage = () => {
        setPickImage(undefined)
        setForm({ ...form, image: '' })
    }

    const handleSend = async () => {
        const { name, price, description } = form
        if (!name || !price || !description) {
            toast('Vui lòng điền đầy đủ thông tin')
            return
        }
        setLoading(true)
        const result = await editSanPham(+id, name, price, description, pickImage, !pickImage && !form.image)
        if (result) {
            toast('Cập nhật sản phẩm thành công')
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <PageHeader tintColor='white' title={'Sửa sản phẩm'} style={{ marginBottom: 12 }} />
                <BackgroundImage source={background} />
                {loading && <Loading />}
                {!loading && <View style={formStyles.container}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {(!pickImage && !form.image) && (
                            <>
                                <Text style={styles.title}>Chọn ảnh</Text>
                                <Pressable onPress={handleSelectImage} style={imageStyles.selectButton}>
                                    <Ionicons name='add' size={24} color={'white'} />
                                </Pressable></>
                        )}
                        {(pickImage || form.image) && (
                            <>
                                <Text style={styles.title}>Xóa ảnh</Text>
                                <Pressable onPress={handleRemoveImage} style={[imageStyles.selectButton, { backgroundColor: Colors.error.default }]}>
                                    <Ionicons name='remove' size={24} color={'white'} />
                                </Pressable></>
                        )}
                    </View>

                    {(pickImage?.uri || form.image) && <Image source={{ uri: pickImage?.uri || form.image }} style={{ alignSelf: 'center', width: '60%', minHeight: 120, resizeMode: 'cover' }} />}

                    <Button
                        text='Cập nhật'
                        btnStyles={formStyles.button}
                        onPress={handleSend}
                        renderIcon={<FontAwesome name='send' size={24} color='white' />}
                    />
                </View>}
            </View>
        </TouchableWithoutFeedback>
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
        marginTop: 2,
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
    },
})

const imageStyles = StyleSheet.create({
    container: {
        width: '33.33333%',
        height: 120,
        borderRadius: 10,
        backgroundColor: '#ffffffde',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    selectButton: {
        width: 30,
        height: 30,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
