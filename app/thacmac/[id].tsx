import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import { appImages } from '@constants/Images'
import BackgroundImage from '@components/View/BackgroundImage'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { useAuth } from '@clerk/clerk-expo'
import { useDangNhap } from '@hooks/useDangNhap'
import { ROLES } from '@constants/Constants'
import Button from '@components/View/Button'
import { postTraLoi } from '@services/thacMacServices'
import { thacMacActions } from '@redux/thacMac.slice'
import useRole from '@hooks/useRole'

const ChiTietThacMac = () => {
    const { id } = useLocalSearchParams()
    const { thacMac } = useAppSelector(state => state.thacMac)
    const { isInRole } = useRole()
    const [noiDung, setNoiDung] = useState('')
    const dispatch = useAppDispatch()
    const { thacMacs } = useAppSelector(state => state.thacMac)

    useEffect(() => {
        setNoiDung(thacMac?.traLoi || '')
    }, [thacMac])

    const handleGuiTraLoi = async () => {
        if (thacMac?.id && noiDung) {
            const newItem = await postTraLoi(thacMac.id, noiDung)
            if (newItem) {
                dispatch(thacMacActions.setThacMacs([...thacMacs.filter(i => i.id !== thacMac.id), newItem]))
                router.back()
            }
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='transparent' />
            {/* Top */}
            <View>
                <BackgroundImage blurRadius={7} source={appImages.thacmac_bg} />
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Giải đáp thắc mắc</Text>
                </View>
            </View>

            <ScrollView>
                <Text style={styles.title}>Câu hỏi:</Text>
                <Text style={styles.description}>{thacMac?.noiDung}</Text>

                <Text style={styles.title}>Trả lời:</Text>
                {isInRole(ROLES.ADMIN) ? (
                    <View style={{ marginHorizontal: 10, gap: 10 }}>
                        <TextInput
                            multiline
                            style={styles.input}
                            placeholder='Nhập câu trả lời'
                            value={noiDung}
                            onChangeText={setNoiDung}
                        />
                        <Button text='Gửi trả lời' onPress={handleGuiTraLoi} />
                    </View>
                ) : (
                    <>
                        {thacMac?.ngayTraLoi ? (
                            <Text style={styles.description}>{thacMac?.traLoi}</Text>
                        ) : (
                            <Text style={styles.description}>Đang chờ trả lời</Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        margin: 16,
    },
    description: {
        marginHorizontal: 16,
        marginBottom: 16,
        lineHeight: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
})

const topStyles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 24,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 4 },
    },
})

export default ChiTietThacMac
