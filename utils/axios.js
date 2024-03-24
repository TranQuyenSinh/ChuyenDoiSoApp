import originAxios from 'axios'

export const axios = originAxios.create({
    baseURL: `http://${process.env.EXPO_PUBLIC_HOST}:8000` || 'https://localhost:8000',
    timeout: 2000,
})

export const authAxios = originAxios.create({
    baseURL: `http://${process.env.EXPO_PUBLIC_HOST}:8000` || 'https://localhost:8000',
    timeout: 2000,
})

export const setTokenAuthAxios = token => {
    authAxios.defaults.headers.common.Authorization = `Bearer ${token}`
}
