import { ThacMac } from '@constants/CommonTypes/ThacMacType'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
    thacMacs: ThacMac[]
    thacMac?: ThacMac
}

const initialState: SliceState = {
    thacMacs: [],
    thacMac: undefined
}

const thacMacSlice = createSlice({
    name: 'thacMac',
    initialState,
    reducers: {
        setThacMacs: (state, { payload }) => {
            state.thacMacs = payload
        },
        setThacMac: (state, { payload }) => {
            state.thacMac = payload
        },
    }
})

export const { actions: thacMacActions } = thacMacSlice
export default thacMacSlice