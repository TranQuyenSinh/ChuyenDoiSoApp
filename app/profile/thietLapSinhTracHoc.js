import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useRouter, useNavigation } from 'expo-router'
import { useDispatch } from 'react-redux'
import { Text, Dimensions, StyleSheet, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import Colors from '@constants/Colors'
import { defaultStyles } from '@constants/Styles'
import PageHeader from '@components/View/PageHeader'
import NotFound from '@components/StatusPage/NotFound'
import { getSecureItem, setSecureItem } from '@utils/secureStore'
import useSinhTracHoc from '@hooks/useSinhTracHoc'
import { Switch } from 'react-native-gesture-handler'
import Constants from '@constants/Constants'
const { width, height } = Dimensions.get('screen')

const DangNhapSinhTracHoc = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const navigation = useNavigation()
    const { isDeviceSupport, isHasBiometric } = useSinhTracHoc()
    const [isEnabled, setIsEnabled] = useState()

    const handleChangeEnabled = async () => {
        setIsEnabled(!isEnabled)

        const loginData = await getSecureItem(Constants.SecureStore.SavedAuth)
        let saveData = { isEnabled: !isEnabled }
        if (!isEnabled === true) {
            saveData = { ...saveData, ...loginData }
        }
        await setSecureItem(Constants.SecureStore.BioAuth, saveData)
    }

    const checkBioEnabled = async () => {
        let isBioEnabled = (await getSecureItem(Constants.SecureStore.BioAuth))?.isEnabled
        setIsEnabled(isBioEnabled)
    }

    useEffect(() => {
        checkBioEnabled()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <>
                <PageHeader title={'Thiết lập sinh trắc học'} />
                <View style={[{ flex: 1, paddingHorizontal: 16, backgroundColor: '#f2f2f2' }]}>
                    <View style={{ marginTop: 20, gap: 10, flex: 1 }}>
                        {!isDeviceSupport && <NotFound message='Thiết bị của bạn không hỗ trợ sinh trắc học' />}
                        {!isHasBiometric && <NotFound message='Thiết bị của bạn chưa thiết lập sinh trắc học' />}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={handleChangeEnabled}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: Colors.white,
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                borderRadius: 8,
                                elevation: 6,
                            }}>
                            <View style={{ flex: 7 }}>
                                <Text style={{ fontSize: 15, fontWeight: 500 }}>Đăng nhập bằng vân tay</Text>
                                <Text>Sử dụng vân tay thay cho mật khẩu để đăng nhập</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Switch
                                    disabled
                                    value={isEnabled}
                                    style={{ width: 50, alignSelf: 'flex-end' }}
                                    trackColor={{ true: '#1ee567', false: '#767577' }}
                                    thumbColor={isEnabled ? '#12fb06' : '#f4f3f4'}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        </TouchableWithoutFeedback>
    )
}

export default DangNhapSinhTracHoc

const styles = StyleSheet.create({})
