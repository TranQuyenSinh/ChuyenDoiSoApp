import originAxios from 'axios'

export const axios = originAxios.create({
    baseURL: `${process.env.EXPO_PUBLIC_HOST}` || 'https://localhost:8000',
    timeout: 2000,
})

export const thongtinAxios = originAxios.create({
    baseURL: `${process.env.EXPO_PUBLIC_THONGTIN_HOST}` || 'https://localhost:8000',
    timeout: 2000,
})

export const authAxios = originAxios.create({
    baseURL: `${process.env.EXPO_PUBLIC_HOST}` || 'https://localhost:8000',
    timeout: 2000,
})

export const thongtinAuthAxios = originAxios.create({
    baseURL: `${process.env.EXPO_PUBLIC_THONGTIN_HOST}` || 'https://localhost:8000',
    timeout: 2000,
})

export const setTokenAuthAxios = token => {
    authAxios.defaults.headers.common.Authorization = `Bearer ${token}`
    thongtinAuthAxios.defaults.headers.common.Authorization = `Bearer ${token}`
}
