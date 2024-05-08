import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from '@components/View/Modal'
import { template } from 'lodash'
import useChat from '@hooks/useChat'
import { toast } from '@utils/toast'
import Button from '@components/View/Button'
import { useField } from 'formik'
import Colors from '@constants/Colors'
import Loading from '@components/StatusPage/Loading'

interface ChatMoTaSanPhamModalProps {
    tenSanPham: string
    isOpen: boolean
    toggle: (isOpen: boolean) => void
    onAccept: (moTa: string) => void
}

const ChatMoTaSanPhamModal = (props: ChatMoTaSanPhamModalProps) => {
    const { tenSanPham, isOpen, toggle, onAccept } = props
    const { taoMoTaSanPham } = useChat()
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            handleTaoMoTa()
        }
    }, [isOpen])

    const handleTaoMoTa = async () => {
        setLoading(true)
        const response = await taoMoTaSanPham(tenSanPham)
        setResponse(response)
        setLoading(false)
    }

    const handleAccept = () => {
        toggle(false)
        onAccept(response)
        setResponse('')
    }

    return (
        <Modal dismissable={false} title='Tạo mô tả sản phẩm tự động' showCloseIcon isOpen={isOpen} toggle={toggle}>
            {loading && <Loading text='Đang tạo mô tả' />}
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    numberOfLines={5}
                    value={response}
                    onChangeText={setResponse}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    btnStyles={[styles.button, { backgroundColor: Colors.default }]}
                    textStyles={{ fontSize: 12 }}
                    text='Tạo lại'
                    onPress={handleTaoMoTa}
                />
                <Button
                    btnStyles={[styles.button, { backgroundColor: Colors.success }]}
                    textStyles={{ fontSize: 12 }}
                    text='Chấp nhận'
                    onPress={handleAccept}
                />
            </View>
        </Modal>
    )
}

export default ChatMoTaSanPhamModal

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        padding: 8,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        maxHeight: 500,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        height: 30,
        borderRadius: 30,
    },
})
