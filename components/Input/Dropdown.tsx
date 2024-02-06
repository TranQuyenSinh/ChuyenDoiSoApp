import React, { useState } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

interface DropdownProps {
    data: any[]
    value: string | undefined
    label: string
    placeholder: string
    mode: 'auto' | 'default' | 'modal' | undefined
    containerStyles: ViewStyle
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
            <Text style={[styles.label]}>{label}</Text>
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
        backgroundColor: 'white',
        marginVertical: 10,
    },
    dropdown: {
        height: 50,
        borderColor: '#c5d1f8',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
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
