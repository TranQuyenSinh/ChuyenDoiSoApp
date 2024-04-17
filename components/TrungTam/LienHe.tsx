import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { pagerStyles } from './pagerStyles'
import { Feather, FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons'
import Button from '@components/View/Button'
import Colors from '@constants/Colors'
import { toast } from '@utils/toast'

const LienHe = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        nhucau: '',
    })

    const handleSend = async () => {
        const { name, email, nhucau } = form
        if (!name || !email || !nhucau) {
            toast('Vui lòng điền đầy đủ thông tin')
            return
        }
    }

    return (
        <View collapsable={false} style={pagerStyles.pageContainer}>
            <Text style={pagerStyles.pageTitle}>Liên hệ với chúng tôi</Text>
            <View style={contactStyles.container}>
                <TextInput
                    value={form.name}
                    onChangeText={text => setForm({ ...form, name: text })}
                    placeholderTextColor={'white'}
                    cursorColor={'white'}
                    autoCapitalize='words'
                    style={contactStyles.input}
                    placeholder='Tên của bạn'
                />
                <TextInput
                    value={form.email}
                    onChangeText={text => setForm({ ...form, email: text })}
                    placeholderTextColor={'white'}
                    cursorColor={'white'}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={contactStyles.input}
                    placeholder='Email'
                />
                <TextInput
                    value={form.nhucau}
                    onChangeText={text => setForm({ ...form, nhucau: text })}
                    placeholderTextColor={'white'}
                    cursorColor={'white'}
                    style={contactStyles.input}
                    placeholder='Nhu cầu của bạn'
                    textAlignVertical='top'
                    multiline
                    numberOfLines={6}
                />
                <Button
                    text='Gửi'
                    btnStyles={contactStyles.button}
                    onPress={handleSend}
                    renderIcon={<FontAwesome name='send' size={24} color='white' />}
                />
            </View>

            <View style={styles.divider} />

            <Text style={pagerStyles.pageTitle}>Thông tin liên hệ</Text>
            <View style={styles.topContainer}>
                <View style={[styles.topItem, { flex: 1 }]}>
                    <Feather name='phone-call' size={24} color='white' />
                    <Text style={styles.topTitle}>Điện thoại</Text>
                    <Text style={styles.topText}>02966.253.599</Text>
                </View>
                <View style={[styles.topItem, { flex: 1 }]}>
                    <Fontisto name='email' size={24} color='white' />
                    <Text style={styles.topTitle}>Email</Text>
                    <Text style={styles.topText}>cict@agu.edu.vn</Text>
                </View>
            </View>
            <View style={styles.topItem}>
                <FontAwesome5 name='map-marker-alt' size={24} color='white' />
                <Text style={styles.topTitle}>Địa chỉ</Text>
                <Text style={styles.topText}>Số 18, Ung Văn Khiêm, P. Đông Xuyên, TP. Long Xuyên, An Giang</Text>
            </View>
        </View>
    )
}

export default LienHe

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    divider: {
        width: '80%',
        borderTopColor: 'white',
        borderTopWidth: 1,
        alignSelf: 'center',
        marginVertical: 12,
    },
    topItem: {
        alignItems: 'center',
        width: 250,
        alignSelf: 'center',
    },
    topTitle: {
        textTransform: 'uppercase',
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topText: {
        color: 'white',
        textAlign: 'center',
    },
})

const contactStyles = StyleSheet.create({
    container: {
        gap: 10,
    },
    inputContainer: {},
    input: {
        color: 'white',
        backgroundColor: '#0000003c',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: Colors.warning,
        marginTop: 12,
    },
})
