import { IProduct } from '@/entities/products'
import { createSlice } from '@reduxjs/toolkit'

export enum ProductsRequestStatus {
	loading,
	success,
	error,
	stock,
}

interface InitialState {
	products: IProduct[]
	status: ProductsRequestStatus
	errorMessage: string
}

const initialState: InitialState = {
	products: [],
	status: ProductsRequestStatus.stock,
	errorMessage: '',
}

const ProductReducer = createSlice({
	name: 'Products',
	initialState,
	reducers: {
		loading: state => {
			state.status = ProductsRequestStatus.loading
		},
		success: (state, request: { payload: IProduct[] }) => {
			state.status = ProductsRequestStatus.success
			state.products = request.payload
		},
		error: (state, message: { payload: string }) => {
			state.status = ProductsRequestStatus.error
			state.errorMessage = message.payload
		},
	},
})

export default ProductReducer
