'use client'

import { IProductsResponse } from '@/entities/products'
import { Header } from '@/widgets/header/header'
import { ProductCard } from '@/widgets/product card/product_card'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
	const [products, setProducts] = useState<IProductsResponse>()
	const fetchProducts = async (limit: number, skip: number): Promise<void> => {
		const result = await axios({
			url: `/products?limit=${limit}&skip=${limit * (skip - 1)}`,
			baseURL: 'https://dummyjson.com',
			method: 'get',
		})
		setProducts(result.data as IProductsResponse)
	}
	useEffect(() => {
		fetchProducts(10, 1)
	}, [])
	return (
		<div className=''>
			<Header></Header>
			<div className='main'>
				{products?.products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
