import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { StatusBar, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
    async getToken(key) {
        try {
            return SecureStore.getItemAsync(key)
        } catch (e) {
            return
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (e) {
            return
        }
    },
}

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        mon: require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <RootLayoutNav />
        </ClerkProvider>
    )
}

function RootLayoutNav() {
    const router = useRouter()
    const { isLoaded, isSignedIn } = useAuth()
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/(modals)/login')
        }
    }, [isLoaded])

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen
                    name='(modals)/login'
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_right',
                        headerShown: false,
                    }}
                />
                {/* <Stack.Screen
                    name='listing/[id]'
                    options={{
                        title: '',
                        presentation: 'modal',
                        animation: 'slide_from_right',
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name='(modals)/booking'
                    options={{
                        presentation: 'transparentModal',
                        headerTransparent: true,
                        headerBackVisible: false,
                        animation: 'fade',
                        headerTitle: () => <ModalHeaderText />,
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#fff',
                                    borderColor: Colors.grey,
                                    borderRadius: 20,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    padding: 4,
                                    elevation: 5,
                                }}
                                onPress={() => router.back()}>
                                <Ionicons name='close-outline' size={22} />
                            </TouchableOpacity>
                        ),
                    }}
                /> */}
            </Stack>
        </>
    )
}
