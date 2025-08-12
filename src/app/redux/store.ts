import { configureStore } from '@reduxjs/toolkit'
import BodyOverflowLockReducer from './reducers/body_ovrf_lock_reducer'
import ProductReducer from './reducers/products_reducer'

export const makeStore = () =>
	configureStore({
		reducer: {
			productReducer: ProductReducer.reducer,
			bodyOverflowLock: BodyOverflowLockReducer.reducer,
		},
	})

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
