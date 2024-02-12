import { setTokenAuthAxios } from '@utils/axios'
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import tinTucSlice from './tinTucSlice'
import dangKySlice from './dangKySlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tinTuc: tinTucSlice.reducer,
        dangKy: dangKySlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const authTokenMiddleWare = api => next => action => {
    const response = next(action)
    if (action.type === 'user/login-oauth/fulfilled' || action.type === 'user/login/fulfilled') {
        const token = api.getState().user.accessToken
        if (token) {
            setTokenAuthAxios(token)
        }
    }

    return response
}
store.subscribe(() => {
    const token = store.getState().user.accessToken
    if (token) {
        setTokenAuthAxios(token)
    }
})

export default store
