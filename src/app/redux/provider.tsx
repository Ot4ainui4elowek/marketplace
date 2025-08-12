'use client'

import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from './store'

export function ReduxProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore>(undefined)
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
