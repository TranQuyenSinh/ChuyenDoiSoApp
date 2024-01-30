import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { inputStyles } from './inputStyles'

const TextInputBox = ({ label, placeholder = 'Aa', value, onChangeText, error = false, inputProps }) => {
    return (
        <View style={[inputStyles.inputContainer, error ? inputStyles.errorContainer : undefined]}>
            <Text style={inputStyles.inputLabel}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={inputStyles.input}
                placeholder={placeholder}
                {...inputProps}
            />
        </View>
    )
}

export const TextAreaInputBox = ({ label, placeholder = 'Aa', value, onChangeText, error = false, inputProps }) => {
    return (
        <View style={[inputStyles.inputContainer, error ? inputStyles.errorContainer : undefined, { height: 'auto' }]}>
            <Text style={inputStyles.inputLabel}>{label}</Text>
            <TextInput
                textAlignVertical='top'
                multiline
                numberOfLines={5}
                value={value}
                onChangeText={onChangeText}
                style={inputStyles.input}
                placeholder={placeholder}
                {...inputProps}
            />
        </View>
    )
}

export default TextInputBox
