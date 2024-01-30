import React, { useState } from 'react'

import DatePickerOrgigin from 'react-native-modern-datepicker'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { inputStyles } from './inputStyles'

export const DateSelect = ({ value = new Date().toISOString().substring(0, 10), label, error, onSelectedChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <View style={[inputStyles.inputContainer, error ? inputStyles.errorContainer : undefined]}>
                <Text style={inputStyles.inputLabel}>{label}</Text>
                <Pressable onPress={toggle}>
                    <Text style={inputStyles.input}>{value}</Text>
                </Pressable>
                <DatePicker isOpen={isOpen} toggle={toggle} onSelectedChange={onSelectedChange} />
            </View>
        </>
    )
}

const DatePicker = ({ isOpen, toggle, onSelectedChange }) => {
    const today = new Date().toISOString().substring(0, 10)

    const handleSelect = e => {
        onSelectedChange(e)
        toggle()
    }
    return (
        <Modal animationType='fade' transparent visible={isOpen}>
            <Pressable onPress={toggle} style={styles.centerdView}>
                <Pressable onPress={e => e.stopPropagation()} style={styles.modalView}>
                    <DatePickerOrgigin
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
