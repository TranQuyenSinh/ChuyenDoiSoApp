import { ToastAndroid } from 'react-native'

export const toast = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
}
