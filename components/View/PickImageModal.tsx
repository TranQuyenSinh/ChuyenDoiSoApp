import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import useChonAnh from '@hooks/useChonAnh'
import Modal from './Modal'
import Button from './Button'
import Colors from '@constants/Colors'

interface PickImageModalProps {
    isOpen: boolean
    toggle: (value: boolean) => void
    onPickAsync: (result: any) => void
}

const PickImageModal = (props: PickImageModalProps) => {
    const { isOpen, toggle, onPickAsync } = props
    const { pickImageAsync } = useChonAnh()
    const handlePick = async (type: 'galery' | 'camera') => {
        const result = await pickImageAsync(type)
        onPickAsync(result)
        toggle(false)
    }

    return (
        <Modal contentStyle={{ padding: 0, overflow: 'hidden' }} isOpen={isOpen} toggle={toggle}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                    style={{
                        paddingVertical: 8,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 18,
                        backgroundColor: Colors.default,
                        width: '100%',
                    }}>
                    Chọn ảnh
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    paddingVertical: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 16,
                }}>
                <Button
                    onPress={() => handlePick('galery')}
                    text='Thư viện'
                    renderIcon={<Ionicons name='image-sharp' size={24} color={Colors.white} />}
                    btnStyles={{ minWidth: 120 }}
                />
                <Button
                    onPress={() => handlePick('camera')}
                    text='Máy ảnh'
                    renderIcon={<Ionicons name='camera-sharp' size={24} color={Colors.white} />}
                    btnStyles={{ minWidth: 120 }}
                />
            </View>
        </Modal>
    )
}

export default PickImageModal

const styles = StyleSheet.create({})
