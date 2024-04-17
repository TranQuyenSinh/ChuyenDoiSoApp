import { useState, useEffect } from 'react'

import { ToastAndroid } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'
import { useDispatch, useSelector } from 'react-redux'

import Constants from '@constants/Constants'
import useWarmUpBrowser from '@hooks/useWarmUpBrowser'
import { useAuth, useUser, useOAuth } from '@clerk/clerk-expo'
import userSlice, {
    logOutServer,
    loginWithOAuth as loginOAuthAction,
    loginWithPassword as loginPasswordAction,
} from '@redux/userSlice'
import { deleteSecureItem, getSecureItem, setSecureItem } from '@utils/secureStore'
import { toast } from '@utils/toast'
import doanhNghiepSlice from '@redux/doanhNghiepSlice'
import khaoSatSlice from '@redux/khaoSatSlice'

WebBrowser.maybeCompleteAuthSession()

export const useDangNhap = () => {
    useWarmUpBrowser()
    const dispatch = useDispatch()

    const { user, isSignedIn } = useUser()
    const { signOut } = useAuth()

    const userStore = useSelector(state => state.user)

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Constants.Strategy.Google })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Constants.Strategy.Facebook })

    const loginOAuth = async strategy => {
        console.log('===> Bắt đầu OAUTH')
        const selectedAuth = {
            [Constants.Strategy.Google]: googleAuth,
            [Constants.Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()
            if (createdSessionId) {
                setActive({ session: createdSessionId })
                // setTypeAuth('google')
            }
        } catch (e) {
            if (e.errors[0]?.code === 'session_exists') {
                await logOut()
                await loginOAuth(strategy)
            }
        }
    }

    const tryLoginBySavedInfo = async secureItemName => {
        let savedAuth = await getSecureItem(secureItemName)
        if (savedAuth?.type === 'oauth') {
            const { providerKey, hoten, email } = savedAuth
            dispatch(loginOAuthAction({ providerKey, hoten, email }))
        } else if (savedAuth?.type === 'password') {
            const { email, password } = savedAuth
            dispatch(loginPasswordAction({ email, password }))
        }
    }

    useEffect(() => {
        ;(async () => {
            if (isSignedIn) {
                const providerKey = user?.id
                const hoten = user?.firstName + ' ' + user?.lastName
                const email = user?.emailAddresses[0]?.emailAddress
                dispatch(loginOAuthAction({ providerKey, hoten, email }))
            }
        })()
    }, [isSignedIn])

    const loginWithPassword = (email, password) => {
        if (!email || !password) {
            toast('Vui lòng nhập đầy đủ thông tin')
            return
        }
        console.log('===> Đăng nhập password')
        dispatch(loginPasswordAction({ email, password }))
    }

    const logOut = async () => {
        dispatch(userSlice.actions.logout())
        dispatch(doanhNghiepSlice.actions.resetDoanhNghiep())
        dispatch(khaoSatSlice.actions.resetKhaoSat())
        dispatch(logOutServer())
        await deleteSecureItem(Constants.SecureStore.SavedAuth)
        console.log('===> User logout success')
        await signOut()
    }

    return { loginWithPassword, loginOAuth, logOut, tryLoginBySavedInfo }
}
