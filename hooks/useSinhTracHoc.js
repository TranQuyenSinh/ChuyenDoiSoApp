import { useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'

const authOptions = {
    promptMessage: 'Đăng nhập sinh trắc học',
}

export default useSinhTracHoc = () => {
    const [isDeviceSupport, setIsDeviceSupport] = useState(false)
    const [isHasBiometric, setIsHasBiometric] = useState(false)

    // array => [1, 2, 3] => 1: vân tay, 2: mặt, 3: mống mắt (android)
    // const [bioType, setBioType] = useState([])

    const bioAuthenticate = async () => {
        const result = await LocalAuthentication.authenticateAsync(authOptions)
        return result.success
    }

    useEffect(() => {
        ;(async () => {
            const isSupport = await LocalAuthentication.hasHardwareAsync()
            const isHasBio = await LocalAuthentication.isEnrolledAsync()
            // const bioTypeSupported = await LocalAuthentication.supportedAuthenticationTypesAsync()
            // setBioType(bioTypeSupported)
            setIsHasBiometric(isHasBio)
            setIsDeviceSupport(isSupport)
        })()
    }, [])

    return [bioAuthenticate, isDeviceSupport, isHasBiometric]

    // const username = 'tranquyensinh@gmail.com'
    // const password = 'Anhzer020'
    // await Keychain.setGenericPassword(username, password, CONFIG)
    // const checkBioSupport = async () => {
    //     try {
    //         const bioType = await Keychain.getSupportedBiometryType({})
    //         // setBioSupport(bioSupport)
    //         console.log('Thiết bị có hỗ trợ')
    //     } catch (error) {
    //         console.log('Thiết bị không hỗ trợ', error)
    //     }
    // }
    // useEffect(() => {
    //     checkBioSupport()
    // }, [])
    // return true
    // const [bioSupport, setBioSupport] = useState(false)
    // const [preLog, setPreLog] = useState(false)
    // const [error, setError] = useState();
    // const [loading, setLoading] = useState(false);

    // const checkUserStatus = async () => {
    //     try {
    //         const credentials = await Keychain.getGenericPassword(CONFIG)
    //     } catch (error) {
    //         console.log("Keychain couldn't be accessed!", error)
    //     }
    // }

    // useEffect(() => {
    //     checkBioSupport()
    // }, [])

    // useEffect(() => {
    //     if (preLog) {
    //         login()
    //     }
    // }, [bioSupport])

    // const checkBioSupport = async () => {
    //     try {
    //         const bioSupport = await Keychain.getSupportedBiometryType()
    //         setBioSupport(bioSupport)
    //     } catch (error) {
    //         console.log('Thiết bị không hỗ trợ')
    //     }
    // }

    // const getUserData = async () => {
    //     try {
    //         const credential = await Keychain.getGenericPassword(CONFIG)
    //         if (credential) {
    //             tryLogin(credential.username, credential.password)
    //         } else {
    //             setLoading(false)
    //         }
    //     } catch (e) {
    //         console.log("Keychain couldn't be accessed!", error)
    //         setLoading(false)
    //     }
    // }

    // const tryLogin = async () => {
    //     try {
    //         // login API
    //         // axios.get(...);
    //     }catch(e) {

    //     }
    // }
}
