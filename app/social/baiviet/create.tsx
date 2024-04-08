import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import Colors from '@constants/Colors'
// @ts-ignore
import background from '@assets/images/background_blur.jpg'
import { DanhMucBaiViet } from '@constants/DienDan/DienDanTypes'
import { createBaiViet, getDanhMucs } from '@services/dienDanServices'
import Loading from '@components/StatusPage/Loading'
import CategoryTag from '@components/DienDan/CategoryTag'
import { toast } from '@utils/toast'
import useChonAnh from '@hooks/useChonAnh'
import { Ionicons } from '@expo/vector-icons'
const CreatePost = () => {
    const navigation = useNavigation()
    const [selectedTags, setSelectedTags] = useState<number[]>([])
    const [tags, setTags] = useState<DanhMucBaiViet[]>([])
    const [selectedImages, setSelectedImages] = useState<any[]>([])
    const { pickImageAsync } = useChonAnh()
    const [loading, setLoading] = useState(false)
    const [noiDung, setNoiDung] = useState('')

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const tags = await getDanhMucs()
            setTags(tags)
            setLoading(false)
        })()
    }, [])

    const handleSelectTag = (item: DanhMucBaiViet) => {
        if (selectedTags.includes(item.id)) {
            setSelectedTags(selectedTags.filter(id => id !== item.id))
        } else {
            if (selectedTags.length > 1) {
                toast('Chỉ được chọn tối đa 2 danh mục')
                return
            }
            setSelectedTags([...selectedTags, item.id])
        }
    }

    const handleSelectImage = async (image: any) => {
        const data = await pickImageAsync('galery', false)
        if (data) {
            setSelectedImages([...selectedImages, data])
        }
    }

    const handleSubmit = async () => {
        const result = await createBaiViet(selectedTags, noiDung, selectedImages)
        if (result) {
            toast('Tạo bài viết thành công và đang chờ duyệt')
            router.back()
        } else {
            toast('Tạo bài viết thất bại')
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Tạo bài viết mới',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={handleSubmit} style={{ marginRight: 10, padding: 8 }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Đăng</Text>
                    </TouchableOpacity>
                )
            },
        })
    }, [navigation, handleSubmit])

    if (loading) return <Loading />
    return (
        <View style={styles.container}>
            <Image source={background} style={[styles.background, StyleSheet.absoluteFill]} />
            <ScrollView
                contentContainerStyle={{
                    overflow: 'hidden',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.title}>Danh mục bài viết</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 6, paddingHorizontal: 2 }}
                        data={tags}
                        renderItem={({ item }) => (
                            <CategoryTag
                                selected={selectedTags.includes(item.id)}
                                data={item}
                                onPress={handleSelectTag}
                            />
                        )}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.title}>Nội dung</Text>
                    <TextInput
                        value={noiDung}
                        onChangeText={text => setNoiDung(text)}
                        textAlignVertical='top'
                        cursorColor={'black'}
                        multiline
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={imageStyles.selectRow}>
                        <Text style={styles.title}>Chọn ảnh ({selectedImages.length}/6)</Text>
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
            </ScrollView>
        </View>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#ffffffde',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        minHeight: 100,
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
