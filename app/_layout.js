import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { ClerkProvider } from '@clerk/clerk-expo'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from '@redux/store'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDangNhap } from '@hooks/useDangNhap'
import Constants from '@constants/Constants'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
import 'moment/locale/vi'

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
        // <GestureHandlerRootView style={{ flex: 1 }}>
        <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <RootLayoutNav />
        </ClerkProvider>
        // </GestureHandlerRootView>
    )
}

function RootLayoutNav() {
    return (
        <AutocompleteDropdownContextProvider>
            <BottomSheetModalProvider>
                <Provider store={store}>
                    <StatusBar barStyle={'dark-content'} />
                    <BootstrapGate>
                        <Stack>
                            <Stack.Screen name='(tabs)' options={{ headerShown: false, animation: 'fade' }} />
                            <Stack.Screen
                                name='[...missing]'
                                options={{
                                    animation: 'none',
                                    headerShown: false,
                                }}
                            />
                        </Stack>
                    </BootstrapGate>
                </Provider>
            </BottomSheetModalProvider>
        </AutocompleteDropdownContextProvider>
    )
}

function BootstrapGate({ children }) {
    const { tryLoginBySavedInfo } = useDangNhap()
    useEffect(() => {
        tryLoginBySavedInfo(Constants.SecureStore.SavedAuth)
    }, [])
    return children
}
