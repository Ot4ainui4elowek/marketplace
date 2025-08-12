import { createSlice } from '@reduxjs/toolkit'

interface initState {
	bodyOverflowLock: boolean
}

const initialState: initState = {
	bodyOverflowLock: false,
}

const bodyOverflowLockReducer = createSlice({
	name: 'body overflow lock',
	initialState,
	reducers: {
		lock: ({ bodyOverflowLock }) => {
			bodyOverflowLock = true
		},
		ulock: ({ bodyOverflowLock }) => {
			bodyOverflowLock = false
		},
	},
})

export default bodyOverflowLockReducer
