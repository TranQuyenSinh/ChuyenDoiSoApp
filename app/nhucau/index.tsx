import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Colors from '@constants/Colors'
import { router, useNavigation } from 'expo-router'
//@ts-ignore
//@ts-ignore
import RowComponent from '@components/View/RowComponent'
const NhuCauIndex = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nhu cầu của bạn',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <RowComponent justify='space-between' gap={6} styles={{ paddingHorizontal: 8, marginTop: 6 }}>
                <Pressable style={styles.button} onPress={() => router.push('/nhucau/phanmem')}>
                    <Text style={styles.buttonText}>Phần mềm</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.push('/nhucau/khac')}>
                    <Text style={styles.buttonText}>Khác</Text>
                </Pressable>
            </RowComponent>
        </View>
    )
}

export default NhuCauIndex

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 1,
        height: 100,
        backgroundColor: Colors.default,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})
