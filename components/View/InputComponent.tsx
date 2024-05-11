import { View, Text, KeyboardType, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { memo, ReactNode, useReducer, useRef, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    value?: string
    affix?: ReactNode
    suffix?: ReactNode
    placeholder?: string
    isPassword?: boolean
    allowClear?: boolean
    type?: KeyboardType
    onEnd?: (val: any) => void
    onChange?: (val: string) => void
}

const InputComponent = (props: Props) => {
    const { value, affix, suffix, placeholder, isPassword, allowClear, type, onChange, onEnd } = props

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false)
    const ref = useRef<TextInput>(null)
    return (
        <View style={[styles.inputContainer]}>
            {affix}
            <TextInput
                ref={ref}
                style={[styles.input]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange?.(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#bbbbbb'}
                keyboardType={type ?? 'default'}
                autoCapitalize='none'
                onEndEditing={() => onEnd?.((ref.current as any)?.value)}
            />
            {suffix}
            <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange?.('')}>
                {isPassword ? (
                    <FontAwesome name={isShowPass ? 'eye-slash' : 'eye'} size={22} color={'#807A7A'} />
                ) : (
                    value && value?.length > 0 && allowClear && <Ionicons name='close' size={18} color={'#807A7A'} />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default memo(InputComponent)

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dadada',
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        backgroundColor: '#fff',
        marginBottom: 19,
    },

    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 6,
        color: '#222831',
    },
})
