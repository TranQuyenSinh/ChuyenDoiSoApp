import { Pressable, StyleSheet, Text, View, Modal as ReactModal, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Modal = ({ isOpen, toggle, showCloseIcon = false, children }) => {
    return (
        <ReactModal animationType='fade' transparent visible={isOpen}>
            <Pressable onPress={toggle} style={styles.centerdView}>
                <Pressable onPress={e => e.stopPropagation()} style={styles.modalView}>
                    {showCloseIcon && (
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={toggle}>
                            <Ionicons name='close-sharp' size={24} color={Colors.bodyText} />
                        </TouchableOpacity>
                    )}
                    {children}
                </Pressable>
            </Pressable>
        </ReactModal>
    )
}

export default Modal

const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000a3',
    },
    modalView: {
        marginVertical: 100,
        backgroundColor: Colors.white,
        borderRadius: 8,
        width: '90%',
        padding: 16,
        alignItems: 'center',
        elevation: 5,
    },
})
