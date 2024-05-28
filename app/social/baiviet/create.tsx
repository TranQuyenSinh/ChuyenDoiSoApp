import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
// @ts-ignore
import background from '@assets/images/background_blur.jpg'
import { createBaiViet } from '@services/dienDanServices'
import Loading from '@components/StatusPage/Loading'
import { toast } from '@utils/toast'
import useChonAnh from '@hooks/useChonAnh'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import RequireLogin from '@components/StatusPage/RequireLogin'
import Button from '@components/View/Button'
import { stackOptions } from '@configs/ScreenConfig'
const CreatePost = () => {
    const navigation = useNavigation()
    const [selectedImages, setSelectedImages] = useState<any[]>([])
    const { pickImageAsync } = useChonAnh()
    const [loading, setLoading] = useState(false)
    const [noiDung, setNoiDung] = useState('')
    const { isLoggedIn } = useSelector((state: RootState) => state.user)

    const handleSelectImage = async () => {
        const data = await pickImageAsync('galery', false)
        if (data) {
            setSelectedImages([...selectedImages, data])
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const result = await createBaiViet(noiDung, selectedImages)
        if (result) {
            toast('Gửi nhu cầu thành công và đang chờ duyệt')
            router.back()
        } else {
            toast('Gửi nhu cầu thất bại')
        }
        setLoading(false)
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Đăng bài',
            ...stackOptions,
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <Image source={background} style={[styles.background, StyleSheet.absoluteFill]} />
            {!isLoggedIn && <RequireLogin />}
            {isLoggedIn && (
                <ScrollView
                    contentContainerStyle={{
                        overflow: 'hidden',
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        flex: 1,
                    }}>
                    <View style={styles.inputWrapper}>
                        <View style={imageStyles.selectRow}>
                            <Text style={styles.title}>Hình ảnh ({selectedImages.length}/6)</Text>
                            {selectedImages.length < 6 && (
                                <Pressable onPress={handleSelectImage} style={imageStyles.selectButton}>
                                    <Ionicons name='add' size={24} color={'white'} />
                                </Pressable>
                            )}
                        </View>

                        <FlatList
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 6 }}
                            numColumns={3}
                            columnWrapperStyle={{ gap: 6 }}
                            data={selectedImages}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() =>
                                        setSelectedImages(selectedImages.filter((x: any) => x.name !== item.name))
                                    }
                                    style={imageStyles.container}>
                                    <Image
                                        source={{ uri: item.uri }}
                                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                    />
                                </Pressable>
                            )}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.title}>Nội dung bài viết</Text>
                        <TextInput
                            value={noiDung}
                            onChangeText={text => setNoiDung(text)}
                            textAlignVertical='top'
                            cursorColor={'black'}
                            multiline
                            style={styles.input}
                        />
                    </View>

                    <Button text='Hoàn thành' btnStyles={styles.button} onPress={handleSubmit} />
                </ScrollView>
            )}
        </View>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    blur: {
        alignSelf: 'center',
        width: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        padding: 16,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#17a2a285',
    },

    inputWrapper: {
        gap: 8,
        marginBottom: 12,
    },
    title: {
        color: '#3b3b3b',
        fontSize: 14,
        fontWeight: '400',
    },
    input: {
        backgroundColor: '#ffffffde',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        minHeight: 200,
    },
    button: {
        elevation: 20,
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
        // marginBottom: 6,
    },
    selectButton: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: Colors.default,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
