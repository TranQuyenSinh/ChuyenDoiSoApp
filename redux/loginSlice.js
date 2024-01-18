import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        providerName: '',
        clerkUser: undefined,
    },
    reducers: {
        setState: (state, { payload }) => {
            state.providerName = payload.providerName
            state.clerkUser = JSON.parse(payload.clerkUser || '')
        },
    },
})

export default loginSlice
