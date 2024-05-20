import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Colors from '@constants/Colors'
import SpaceComponent from '@components/View/SpaceComponent'
import InputComponent from '@components/View/InputComponent'
import Button from '@components/View/Button'
import ImageComponent from '@components/View/ImageComponent'
import IconButton from '@components/View/IconButton'
import { Ionicons } from '@expo/vector-icons'
import PickImageModal from '@components/View/PickImageModal'
import useToggle from '@hooks/useToggle'
import { appIcons, appImages } from '@constants/Images'
import { toast } from '@utils/toast'
import { createThanhTich } from '@services/thanhTichServices'
import { useAppDispatch } from '@redux/store'
import { doanhNghiepActions } from '@redux/doanhNghiepSlice'
import { BottomSheetModalRef } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types'

export type Ref = BottomSheetModal
interface CreateThanhTichBottomSheetProps {
    onFinish?: () => void
}

const CreateThanhTichBottomSheet = forwardRef<Ref, CreateThanhTichBottomSheetProps>((props, ref) => {
    const snapPoints = useMemo(() => ['80%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
        []
    )
    const dispatch = useAppDispatch()
    const { isOpen, toggle } = useToggle()
    const inputRef = useRef<TextInput>(null)
    const [name, setName] = useState('')
    const [image, setImage] = useState<any>()

    const handlePickImage = async (imgInfo: any) => {
        if (imgInfo) {
            setImage(imgInfo)
        }
    }

    const handleCreate = async () => {
        if (!name) {
            toast('Vui lòng nhập tên thành tích')
            return
        }
        const thanhTichs = await createThanhTich(name, image)
        if (thanhTichs) {
            dispatch(doanhNghiepActions.setThanhTichs(thanhTichs))
            inputRef.current?.clear()
            props.onFinish?.()
        } else {
            toast('Có lỗi xảy ra, vui lòng thử lại')
        }
    }

    return (
        <BottomSheetModal
            keyboardBehavior='fillParent'
            handleIndicatorStyle={styles.indicator}
            backgroundStyle={styles.container}
            backdropComponent={renderBackdrop}
            ref={ref}
            snapPoints={snapPoints}>
            <View style={styles.container}>
                <ImageComponent source={appIcons.guaranteed} height={40} width={40} />
                <Text style={styles.title}>Thêm mới thành tích</Text>
                <TextInput
                    placeholder='Tên thành tích, chứng nhận'
                    ref={inputRef}
                    onChangeText={setName}
                    style={styles.input}
                />
                <Text style={styles.subTitle}>Hình ảnh (nếu có)</Text>
                <View style={styles.imageContainer}>
                    {image?.uri ? (
                        <View style={{ width: '100%' }}>
                            <IconButton onPress={() => setImage(undefined)} style={styles.closeButton}>
                                <Ionicons name='close-circle-outline' size={20} color={Colors.textGray} />
                            </IconButton>
                            <ImageComponent uri={image.uri} width={'100%'} height={300} resizeMode='contain' />
                        </View>
                    ) : (
                        <Pressable style={{ width: '100%' }} onPress={() => toggle(true)}>
                            <ImageComponent width={'100%'} height={100} resizeMode='contain' />
                        </Pressable>
                    )}
                </View>
                <Button btnStyles={styles.button} text='Thêm mới' onPress={handleCreate} />
            </View>

            <PickImageModal isOpen={isOpen} toggle={toggle} onPickAsync={handlePickImage} />
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 14,
    },
    indicator: {
        width: 50,
        backgroundColor: Colors.default,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dadada',
        borderRadius: 8,
        padding: 8,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 999,
    },
    imageContainer: {
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dadada',
        padding: 16,
    },
    button: {
        marginTop: 'auto',
    },
})

export default CreateThanhTichBottomSheet
