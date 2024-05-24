import { ThacMac } from '@constants/CommonTypes/ThacMacType'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
    thacMac?: ThacMac
}

const initialState: SliceState = {
    thacMac: undefined
}

const thacMacSlice = createSlice({
    name: 'thacMac',
    initialState,
    reducers: {
        setThacMac: (state, { payload }) => {
            state.thacMac = payload
        },
    }
})

export const { actions: thacMacActions } = thacMacSlice
export default thacMacSlice