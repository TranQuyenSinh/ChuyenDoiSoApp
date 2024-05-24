import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { forwardRef, Ref, useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import Colors from '@constants/Colors'
import useToggle from '@hooks/useToggle'
import Button from '@components/View/Button'
import { createThacMac } from '@services/thacMacServices'
import { ThacMac } from '@constants/CommonTypes/ThacMacType'

interface CreateThacMacSheetProps {
    onFinished: (newItem: ThacMac) => void
}

const CreateThacMacSheet = forwardRef<BottomSheetModal, CreateThacMacSheetProps>((props, ref) => {
    const { onFinished } = props
    const snapPoints = useMemo(() => ['50%'], [])
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
        []
    )
    const inputRef = useRef<TextInput>(null)
    const textRef = useRef('')

    const handleCreate = async () => {
        if (!textRef.current) return
        const newThacMac = await createThacMac(textRef.current)
        if (newThacMac) {
            onFinished(newThacMac)
        }
        inputRef.current?.clear()
        textRef.current = ''
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
                <Text style={styles.title}>Nhập câu hỏi của bạn</Text>
                <TextInput
                    placeholder='Aa'
                    ref={inputRef}
                    onChangeText={t => (textRef.current = t)}
                    style={styles.input}
                    multiline
                    textAlignVertical='top'
                />
                <Button btnStyles={styles.button} text='Gửi' onPress={handleCreate} />
            </View>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 12,
    },
    indicator: {
        width: 50,
        backgroundColor: Colors.default,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
        borderRadius: 8,
        padding: 12,
        flex: 1,
    },
    button: {
        marginBottom: 20,
        elevation: 10,
        backgroundColor: Colors.orange,
        height: 40,
    },
})

export default CreateThacMacSheet
