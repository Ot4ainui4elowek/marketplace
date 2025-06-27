'use client'

import { IProductsResponse } from '@/entities/products'
import { Header } from '@/widgets/header/header'
import { ProductCard } from '@/widgets/product card/product_card'
import { SkeletonProductCard } from '@/widgets/product card/s_product_card'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
	const [products, setProducts] = useState<IProductsResponse>()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	let [curentPage, setCurentPage] = useState<number>(0)
	const fetchProducts = async (limit: number, skip: number): Promise<void> => {
		setIsLoading(true)
		const result = await axios({
			url: `/products?limit=${limit}&skip=${limit * skip}`,
			baseURL: 'https://dummyjson.com',
			method: 'get',
		})
		let productsResponse: IProductsResponse = result.data
		console.log(productsResponse)
		setProducts(productsResponse)
		setIsLoading(false)
	}
	const fetchNextProduct = async () => {
		if (products == undefined) {
			return
		}
		if (products.products.length < 10) {
			return
		}
		setCurentPage(++curentPage)
		fetchProducts(10, curentPage)
	}
	const fetchPreviosProduct = () => {
		if (curentPage == 0) {
			return
		}
		setCurentPage(--curentPage)
		fetchProducts(10, curentPage)
	}
	const skeletonArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

	useEffect(() => {
		fetchProducts(10, curentPage)
	}, [])
	return (
		<div className=''>
			<Header></Header>
			<div className='main'>
				{isLoading
					? skeletonArray.map(el => <SkeletonProductCard />)
					: products?.products.map(product => (
							<ProductCard key={product.id} product={product} />
					  ))}
			</div>
			<div className='pagination_buttons'>
				<button className='previos_button' onClick={fetchPreviosProduct}>
					{'<'}
				</button>
				<h2>{curentPage + 1}</h2>
				<button className='next-button' onClick={fetchNextProduct}>
					{'>'}
				</button>
			</div>
		</div>
	)
}
