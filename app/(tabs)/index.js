import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'expo-router'
import { defaultStyles } from '@constants/Styles'

export default function TabOneScreen() {
    const [data, setData] = useState()
    const fetchData = async () => {
        try {
            let { data } = await axios.get('http://192.168.1.24:8080/api/auth')
            setData(data.name)
        } catch (e) {
            console.error(e.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <Link href={'/(modals)/login'}>
                <Text>{data}</Text>
            </Link>
            <TouchableOpacity style={defaultStyles.btn} onPress={fetchData}>
                <Text style={defaultStyles.btnText}>Click me</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
