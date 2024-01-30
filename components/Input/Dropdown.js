import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import Colors from '@constants/Colors'

const DropdownComponent = ({ data, label = 'Chọn', placeholder = '', onSelectedChange }) => {
    const [value, setValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false)

    const renderLabel = () => {
        return <Text style={[styles.label, isFocus && { color: 'blue' }]}>{label}</Text>
    }
    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: Colors.default }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder={!isFocus ? placeholder : '...'}
                searchPlaceholder='Search...'
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value)
                    setIsFocus(false)
                    onSelectedChange(item)
                }}
                mode='modal'
                // renderLeftIcon={() => (
                //     <AntDesign style={styles.icon} color={isFocus ? 'blue' : 'black'} name='Safety' size={20} />
                // )}
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
