import { initializeApp } from 'firebase/app';
import {
    collection,
    getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyAZeHyTwfbiZjnbnILw_OpOA3rMj52lO3g',
    authDomain: 'chuyendoisochat.firebaseapp.com',
    projectId: 'chuyendoisochat',
    storageBucket: 'chuyendoisochat.appspot.com',
    messagingSenderId: '23514328089',
    appId: '1:23514328089:web:9db2f3a7b454f13a184e88',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const messageRef = collection(db, process.env.EXPO_PUBLIC_FIREBASE_MESSAGE_TABLE || "message_sinh")

