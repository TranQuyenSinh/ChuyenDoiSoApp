import { useState, useEffect, useCallback } from 'react'

import { ToastAndroid } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'
import { useDispatch, useSelector } from 'react-redux'

import Constants, { ROLE, ROLES } from '@constants/Constants'
import useWarmUpBrowser from '@hooks/useWarmUpBrowser'
import { useAuth, useUser, useOAuth } from '@clerk/clerk-expo'
import userSlice, {
    logOutServer,
    loginWithOAuth as loginOAuthAction,
    loginWithPassword as loginPasswordAction,
} from '@redux/userSlice'
import { deleteSecureItem, getSecureItem, setSecureItem } from '@utils/secureStore'
import { toast } from '@utils/toast'
import doanhNghiepSlice, { fetchDoanhNghiepInfo } from '@redux/doanhNghiepSlice'
import khaoSatSlice from '@redux/khaoSatSlice'
import { thongBaoActions } from '@redux/thongBaoSlice'
import { AppDispatch, RootState } from '@redux/store'

WebBrowser.maybeCompleteAuthSession()

export const useDangNhap = () => {
    useWarmUpBrowser()
    const dispatch = useDispatch<AppDispatch>()

    const { user, isSignedIn } = useUser()
    const { userProfile, isLoggedIn } = useSelector((state: RootState) => state.user)
    const { signOut } = useAuth()

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const loginOAuth = async (strategy: any) => {
        console.log('===> Bắt đầu OAUTH')
        const selectedAuth = {
            [Constants.Strategy.Google]: googleAuth,
            [Constants.Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()
            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId })
            }
        } catch (e: any) {
            if (e.errors[0]?.code === 'session_exists') {
                await logOut()
                await loginOAuth(strategy)
            }
        }
    }

    const tryLoginBySavedInfo = async (secureItemName: 'oauth' | 'password') => {
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
        ; (async () => {
            if (isSignedIn) {
                const providerKey = user?.id
                const hoten = user?.firstName + ' ' + user?.lastName
                const email = user?.emailAddresses[0]?.emailAddress
                dispatch(loginOAuthAction({ providerKey, hoten, email }))
            }
        })()
    }, [isSignedIn])

    useEffect(() => {
        if (isLoggedIn && isInRole(ROLES.DOANH_NGHIEP)) {
            dispatch(fetchDoanhNghiepInfo())
        }
    }, [isLoggedIn])

    const loginWithPassword = (email: string, password: string) => {
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
        dispatch(thongBaoActions.resetThongBao())
        dispatch(logOutServer())
        await deleteSecureItem(Constants.SecureStore.SavedAuth)
        console.log('===> User logout success')
        await signOut()
    }

    const isInRole = useCallback((roleId: ROLE) => {
        return userProfile?.vaitro?.[0]?.id === roleId
    }, [userProfile])

    return { loginWithPassword, loginOAuth, logOut, tryLoginBySavedInfo, isInRole }
}
