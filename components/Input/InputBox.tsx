import React, { useState, ReactNode } from 'react'
import { Text, View, TextInput, ViewStyle, TextInputProps } from 'react-native'
import { inputStyles } from './inputStyles'

interface ValidateInputBoxProps {
    containerStyles: ViewStyle
    field: any
    form: any
    label: string
    placeholder?: string
    inputProps?: TextInputProps
    onChangeText?: (name: string, text: string) => void
}

export const ValidateInputBox = (props: ValidateInputBoxProps) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        containerStyles,
        label,
        placeholder = 'Aa',
        inputProps,
        onChangeText,
    } = props

    const hasError = errors[name] && touched[name]
    const handleChange = (name: string) => (text: string) => {
        // sự kiện change text của thư viện
        onChange(name)(text)

        // sự kiện change text từ props
        onChangeText && onChangeText(name, text)
    }
    return (
        <View style={{ gap: 2 }}>
            <View style={[inputStyles.inputContainer, hasError && inputStyles.errorContainer, containerStyles]}>
                <TextInput
                    value={value}
                    onChangeText={text => handleChange(name)(text)}
                    style={inputStyles.input}
                    placeholder={label}
                    onBlur={() => {
                        setFieldTouched(name)
                        onBlur(name)
                    }}
                    {...inputProps}
                />
            </View>
            {hasError && <Text style={inputStyles.errorText}>{errors[name]}</Text>}
        </View>
    )
}

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
