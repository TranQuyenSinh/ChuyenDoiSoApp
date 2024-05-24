import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button, { ButtonProps } from './Button'
import Colors from '@constants/Colors'

const BottomButton = (props: ButtonProps) => {
    return <Button {...props} textStyles={styles.buttonText} btnStyles={styles.button} />
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20,
        height: 50,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: Colors.orange,
    },
    buttonText: {
        fontFamily: 'mon-sb',
        fontSize: 15,
    },
})

export default BottomButton
