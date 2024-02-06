import React, { useState } from 'react'

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import DatePickerOrigin from 'react-native-modern-datepicker'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { inputStyles } from './inputStyles'
interface DateSelectProps {
    value: string | Date
    label: string
    error: boolean
    onSelectedChange: (text: string) => void
    otherProps: DatePickerProps
}

export const DateSelect = ({
    value = new Date().toISOString().substring(0, 10),
    label,
    error,
    onSelectedChange,
    otherProps,
}: DateSelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <View style={[inputStyles.inputContainer, error ? inputStyles.errorContainer : undefined]}>
                <Text style={inputStyles.inputLabel}>{label}</Text>
                <Pressable onPress={toggle}>
                    <Text style={inputStyles.input}>{value.toString()}</Text>
                </Pressable>
                <DatePicker {...otherProps} isOpen={isOpen} toggle={toggle} onSelectedChange={onSelectedChange} />
            </View>
        </>
    )
}

interface DatePickerProps {
    isOpen: boolean
    toggle: () => void
    onSelectedChange: (e: any) => void
}

const DatePicker = ({ isOpen, toggle, onSelectedChange }: DatePickerProps) => {
    const today = new Date().toISOString().substring(0, 10)

    const handleSelect = (e: any) => {
        onSelectedChange(e)
        toggle()
    }
    return (
        <Modal animationType='fade' transparent visible={isOpen}>
            <Pressable onPress={toggle} style={styles.centerdView}>
                <Pressable onPress={e => e.stopPropagation()} style={styles.modalView}>
                    <DatePickerOrigin
                        current={today}
                        selected={today}
                        mode={'calendar'}
                        onDateChange={handleSelect}
                        options={{
                            borderColor: 'transparent',
                            mainColor: Colors.default,
                        }}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000a3',
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
})
