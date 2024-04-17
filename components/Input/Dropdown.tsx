import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { inputStyles } from './inputStyles'

interface ValidateDropdownProps {
    field: any
    form: any
    data: any[]
    value?: string | undefined
    label?: string
    placeholder?: string
    mode?: 'auto' | 'default' | 'modal'
    containerStyles?: ViewStyle
    onSelectedChange: (name: string, item: { label: any; value: any }) => void
}

export const ValidateDropdownComponent = ({
    data,
    label = 'Chọn',
    placeholder = '',
    mode = 'modal',
    onSelectedChange,
    containerStyles,
    field: { name, onChange, value },
    form: { errors },
}: ValidateDropdownProps) => {
    const hasError = !!errors[name]

    const handleChange = (name: string) => (item: { value: string; label: string }) => {
        // sự kiện change text của thư viện
        onChange(name)(item.value?.toString())
        // sự kiện change text từ props
        onSelectedChange && onSelectedChange(name, item)
    }

    return (
        <View style={[styles.container, containerStyles]}>
            <Dropdown
                style={[styles.dropdown, hasError && { borderColor: 'red' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField={'label'}
                valueField={'value'}
                placeholder={label}
                searchPlaceholder='Search...'
                value={data?.find(x => x.value === value)?.value}
                onChange={item => {
                    handleChange(name)(item)
                }}
                mode={mode}
            />
            {hasError && <Text style={inputStyles.errorText}>{errors[name]}</Text>}
        </View>
    )
}

interface DropdownProps {
    data: any[]
    value?: string | undefined
    label?: string
    placeholder?: string
    mode?: 'auto' | 'default' | 'modal'
    containerStyles?: ViewStyle
    onSelectedChange: (item: { label: any; value: any }) => void
}

const DropdownComponent = ({
    data,
    value: initialValue,
    label = 'Chọn',
    placeholder = '',
    mode = 'modal',
    onSelectedChange,
    containerStyles,
}: DropdownProps) => {
    const [value, setValue] = useState(initialValue)

    return (
        <View style={[styles.container, containerStyles]}>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField={'label'}
                valueField={'value'}
                placeholder={placeholder}
                searchPlaceholder='Search...'
                value={value}
                onChange={item => {
                    setValue(item.value)
                    onSelectedChange && onSelectedChange(item)
                }}
                mode={mode}
            />
        </View>
    )
}

export default DropdownComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginVertical: 10,
        overflow: 'hidden',
        borderRadius: 8,
    },
    dropdown: {
        height: 50,
        borderColor: '#c5d1f8',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ebebeb',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 10,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
