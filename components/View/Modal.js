import { Pressable, StyleSheet, Text, View, Modal as ReactModal, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Modal = ({ dismissable = true, title = "", isOpen, toggle, showCloseIcon = false, children, contentStyle = {} }) => {
    const handleClose = () => {
        if (dismissable) {
            toggle(false)
        }
    }
    return (
        <ReactModal animationType='fade' transparent visible={isOpen}>
            <Pressable onPress={handleClose} style={styles.centerdView}>
                <Pressable onPress={e => e.stopPropagation()} style={[styles.modalView, contentStyle, title && { paddingTop: 50 }]}>
                    {showCloseIcon && (
                        <TouchableOpacity style={styles.closeIcon} onPress={toggle}>
                            <Ionicons name='close-sharp' size={24} color={title ? '#fff' : Colors.bodyText} />
                        </TouchableOpacity>
                    )}
                    {title && <Text style={styles.title}>{title}</Text>}
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
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: Colors.default,
        color: 'white',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingVertical: 6,
        textAlign: 'center'

    }
})
