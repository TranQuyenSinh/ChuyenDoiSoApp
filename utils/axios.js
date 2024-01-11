import originAxios from 'axios'
// import { store } from './redux/store'

export const axios = originAxios.create({
    baseURL: `http://${process.env.EXPO_PUBLIC_HOST}:8080` || 'https://localhost:8080',
    timeout: 2000,
})

// authAxios.interceptors.request.use(config => {
//     let accessToken = store.getState().user.currentUser?.accessToken
//     config.headers['Authorization'] = 'Bearer ' + accessToken
//     return config
// })

// authAxios.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         const originalRequest = error.config
//         let accessToken = store.getState().user.currentUser?.accessToken
//         let refreshToken = getCookie('refreshToken') || ''
//         let { status } = error.response
//         if (status == 401) {
//             // xin token
//             authAxios
//                 .post(authApi.refreshToken, { accessToken, refreshToken })
//                 .then(tokenRefreshResponse => {
//                     let newToken = tokenRefreshResponse.data.accessToken
//                     store.dispatch(refreshAccessToken(newToken))
//                     // gọi lại api failed
//                     authAxios
//                         .request(originalRequest)
//                         .then(response => {
//                             Promise.resolve(response)
//                         })
//                         .catch(err => {
//                             Promise.reject(err)
//                         })

//                     return Promise.resolve()
//                 })
//                 .catch(err => {
//                     // refresh token expired
//                     store.dispatch(logoutUser())
//                 })
//         }
//         return Promise.reject(error)
//     }
// )

// Handle errors from ASP.NET server
