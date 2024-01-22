import { useState, useEffect } from 'react'

import { ToastAndroid } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'
import { useDispatch, useSelector } from 'react-redux'

import loginSlice from '@redux/loginSlice'
import Constants from '@constants/Constants'
import useWarmUpBrowser from '@hooks/useWarmUpBrowser'
import { useAuth, useUser, useOAuth } from '@clerk/clerk-expo'
import userSlice, {
    loginWithOAuth as loginOAuthAction,
    loginWithPassword as loginPasswordAction,
} from '@redux/userSlice'

WebBrowser.maybeCompleteAuthSession()

export const useDangNhap = prop => {
    useWarmUpBrowser()
    const router = useRouter()
    const dispatch = useDispatch()

    const { user, isLoaded, isSignedIn } = useUser()
    const { signOut } = useAuth()

    const userStore = useSelector(state => state.user)
    const { isLoggedIn, status, errorMessage } = userStore

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Constants.Strategy.Google })

    const [providerName, setProviderName] = useState('')
    const [typeAuth, setTypeAuth] = useState('')

    // useEffect(() => {
    //     SecureStore.setItemAsync(
    //         'auth_info',
    //         JSON.stringify({
    //             typeAuth,
    //             email: user.email,
    //         })
    //     )
    // }, [isLoggedIn])

    const loginOAuth = async strategy => {
        console.log('===> Bắt đầu OAUTH')
        const selectedAuth = {
            [Constants.Strategy.Google]: googleAuth,
            // [Constants.Strategy.Facebook]: facebookAuth,
        }[strategy]
        setProviderName(strategy)

        try {
            const { createdSessionId, setActive } = await selectedAuth()
            if (createdSessionId) {
                setActive({ session: createdSessionId })
                setTypeAuth('google')
            }
        } catch (e) {
            if (e.errors[0]?.code === 'session_exists') {
                await logOut()
                await loginOAuth(strategy)
            }
        }
    }

    useEffect(() => {
        if (user) {
            console.log('===> Email user login: ', user?.emailAddresses[0]?.emailAddress)

            dispatch(
                loginOAuthAction({
                    providerName: providerName,
                    providerKey: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.emailAddresses[0]?.emailAddress,
                    photo: user?.imageUrl,
                })
            )
        }
    }, [user])

    useEffect(() => {
        if (status === 'require_password_to_create' && user) {
            // lưu lại google userInfo
            dispatch(
                loginSlice.actions.setState({
                    providerName,
                    clerkUser: JSON.stringify(user),
                })
            )
            router.push('(modals)/createPassword')
        }
    }, [status, user])

    const loginWithPassword = (email, password) => {
        if (!email || !password) return
        dispatch(loginPasswordAction({ email, password }))
    }

    const logOut = async () => {
        await signOut()
        dispatch(userSlice.actions.logout())
        console.log('===> User logout success')
    }

    useEffect(() => {
        if (status === 'error' && errorMessage) {
            ToastAndroid.showWithGravity(errorMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
    }, [status])

    return { loginWithPassword, loginOAuth, logOut }
}
