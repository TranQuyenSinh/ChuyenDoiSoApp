import React, { useLayoutEffect, useState } from 'react'

import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    FlatList,
} from 'react-native'
import { useNavigation, router } from 'expo-router'

import PageHeader from '@components/View/PageHeader'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { toast } from '@utils/toast'
import useChonAnh from '@hooks/useChonAnh'
import { createSanPham } from '@services/sanPhamServices'
import { formatPrice } from '@utils/format'
import { pick } from 'lodash'

const CreateProduct = () => {
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

    const handleSelectImage = async () => {
        const data = await pickImageAsync('galery', false)
        if (data) {
            // setImages([...images, data])
            setPickImage(data)
        }
    }

    const handleSend = async () => {
        const { name, price, description } = form
        if (!name || !price || !description) {
            toast('Vui lòng điền đầy đủ thông tin')
            return
        }
        setLoading(true)
        const result = await createSanPham(name, price, description, pickImage)
        if (result) {
            toast('Đăng sản phẩm thành công')
            router.back()
        } else {
            toast('Đăng sản phẩm thất bại')
        }
        setLoading(false)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <PageHeader tintColor='white' title={'Đăng sản phẩm'} style={{ marginBottom: 12 }} />
                <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />
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
                        value={formatPrice(form.price) == "NaN" ? '' : formatPrice(form.price) + ""}
                        onChangeText={text => setForm({ ...form, price: text.replaceAll('.', '').replaceAll('NaN', '') })}
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
                        <Text style={styles.title}>Chọn ảnh</Text>
                        <Pressable onPress={handleSelectImage} style={imageStyles.selectButton}>
                            <Ionicons name='add' size={24} color={'white'} />
                        </Pressable>
                    </View>

                    {pickImage?.uri && <Image source={{ uri: pickImage?.uri }} style={{ alignSelf: 'center', width: '60%', height: 120, resizeMode: 'cover' }} />}
                    {/* <FlatList
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 6 }}
                        numColumns={3}
                        columnWrapperStyle={{ gap: 6 }}
                        data={images}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => setImages(images.filter((x: any) => x.name !== item.name))}
                                style={imageStyles.container}>
                                <Image
                                    source={{ uri: item.uri }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                />
                            </Pressable>
                        )}
                    /> */}

                    <Button
                        text='Đăng'
                        btnStyles={formStyles.button}
                        onPress={handleSend}
                        renderIcon={<FontAwesome name='send' size={24} color='white' />}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateProduct

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
