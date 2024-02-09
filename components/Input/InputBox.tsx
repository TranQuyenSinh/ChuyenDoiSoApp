import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import React, { Children, ReactComponentElement, ReactNode, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@constants/Colors'
import { inputStyles } from './inputStyles'

interface TextInputBoxProps {
    label: string
    placeholder?: string
    value?: any
    onChangeText: (text: string) => void
    error?: boolean
    containerStyles?: ViewStyle
    isShownCount?: boolean
    maxLength?: number
    inputProps?: TextInputProps
}

const TextInputBox = ({
    label,
    placeholder = 'Aa',
    value,
    containerStyles,
    onChangeText,
    error = false,
    inputProps,
    isShownCount,
    maxLength = 255,
}: TextInputBoxProps) => {
    const [count, setCount] = useState(0)

    const handleChangeText = (text: string) => {
        if (isShownCount) {
            setCount(text.length)
        }
        onChangeText(text)
    }

    return (
        <View style={[inputStyles.inputContainer, error ? inputStyles.errorContainer : undefined, containerStyles]}>
            <Text style={inputStyles.inputLabel}>{label}</Text>
            {isShownCount && (
                <Text style={inputStyles.countLabel}>
                    {count}/{maxLength}
                </Text>
            )}

            <TextInput
                value={value?.toString()}
                onChangeText={handleChangeText}
                style={inputStyles.input}
                placeholder={placeholder}
                {...inputProps}
            />
        </View>
    )
}

interface TextInputBoxWrapperProps {
    containerStyles: ViewStyle
    textStyles: ViewStyle
    label: string
    error: boolean
    children: ReactNode
}

export const TextInputBoxWrapper = ({
    containerStyles,
    textStyles,
    label,
    error = false,
    children,
}: TextInputBoxWrapperProps) => {
    return (
        <View
            style={[
                inputStyles.inputContainer,
                { height: 'auto' },
                error ? inputStyles.errorContainer : undefined,
                containerStyles,
            ]}>
            <Text style={[inputStyles.inputLabel, textStyles]}>{label}</Text>
            {children}
        </View>
    )
}

export const TextAreaInputBox = ({
    label,
    placeholder = 'Aa',
    value,
    onChangeText,
    error = false,
    inputProps,
}: TextInputBoxProps) => {
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
