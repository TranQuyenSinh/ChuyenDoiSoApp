import { useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { toast } from '@utils/toast'
import { getSecureItem } from '@utils/secureStore'
import { useDangNhap } from './useDangNhap'
import Constants from '@constants/Constants'
import { Alert } from 'react-native'

const authOptions = {
    promptMessage: 'Đăng nhập sinh trắc học',
}

export default useSinhTracHoc = () => {
    const [isDeviceSupport, setIsDeviceSupport] = useState(false)
    const [isHasBiometric, setIsHasBiometric] = useState(false)
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)
    const { tryLoginBySavedInfo } = useDangNhap()

    // array => [1, 2, 3] => 1: vân tay, 2: mặt, 3: mống mắt (android)
    // const [bioType, setBioType] = useState([])

    const bioAuthenticate = async () => {
        if (!isDeviceSupport) {
            Alert.alert('Thiết bị của bạn không hỗ trợ sinh trắc học')
            return
        }
        if (!isHasBiometric) {
            Alert.alert('Thiết bị của bạn chưa đăng ký sinh trắc học')
            return
        }
        if (!isBiometricEnabled) {
            Alert.alert('Bạn chưa thiết lập đăng nhập sinh trắc học')
            return
        }
        const result = await LocalAuthentication.authenticateAsync(authOptions)
        const success = result.success
        if (success) {
            tryLoginBySavedInfo(Constants.SecureStore.BioAuth)
        }
    }

    useEffect(() => {
        ;(async () => {
            const isSupport = await LocalAuthentication.hasHardwareAsync()
            const isHasBio = await LocalAuthentication.isEnrolledAsync()
            const isBioEnabled = (await getSecureItem(Constants.SecureStore.BioAuth))?.isEnabled
            setIsBiometricEnabled(isBioEnabled)
            setIsHasBiometric(isHasBio)
            setIsDeviceSupport(isSupport)
        })()
    }, [])

    return { bioAuthenticate, isDeviceSupport, isHasBiometric, isBiometricEnabled }
}
