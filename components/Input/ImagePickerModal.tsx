import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import useChonAnh from '@hooks/useChonAnh'
import Modal from '@components/View/Modal'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'

interface Props {
    isOpen: boolean
    toggle: () => void
    onPicked: (image: { uri: string; name: string; type: string }) => void
}

const ImagePickerModal = (props: Props) => {
    const { onPicked, isOpen, toggle } = props
    const { pickImageAsync } = useChonAnh()
    const handlePickImage = async (pickType: 'galery' | 'camera') => {
        const data = await pickImageAsync(pickType)
        if (data) {
            onPicked(data)
        }
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Text style={styles.modalTitle}>Chọn ảnh từ</Text>
            <View style={styles.modalContent}>
                <Button
                    onPress={() => handlePickImage('galery')}
                    text='Thư viện'
                    renderIcon={<Ionicons name='image-sharp' size={24} color={Colors.white} />}
                    btnStyles={styles.button}
                />
                <Button
                    onPress={() => handlePickImage('camera')}
                    text='Máy ảnh'
                    renderIcon={<Ionicons name='camera-sharp' size={24} color={Colors.white} />}
                    btnStyles={styles.button}
                />
            </View>
        </Modal>
    )
}

export default ImagePickerModal

const styles = StyleSheet.create({
    modalTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    modalContent: {
        padding: 24,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 16,
    },
    button: {
        backgroundColor: Colors.default,
        borderRadius: 4,
        paddingHorizontal: 12,
    },
})
