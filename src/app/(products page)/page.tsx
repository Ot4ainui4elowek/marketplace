'use client'
import ArrowSVG from '@/shared/arrow'
import { Header } from '@/widgets/header/header'
import { ProductCard } from '@/widgets/product card/product_card'
import { SkeletonProductCard } from '@/widgets/product card/s_product_card'
import axios from 'axios'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import ProductReducer, {
	ProductsRequestStatus,
} from '../redux/reducers/products_reducer'
import './products_page.css'

export default function Home() {
	const { products, status, errorMessage } = useAppSelector(
		state => state.productReducer
	)
	const { error, loading, success } = ProductReducer.actions
	const dispatch = useAppDispatch()

	let [curentPage, setCurentPage] = useState<number>(0)

	const fetchProducts = async (limit: number, skip: number): Promise<void> => {
		dispatch(loading())
		let result
		try {
			result = await axios({
				url: `/products?limit=${limit}&skip=${limit * skip}`,
				baseURL: 'https://dummyjson.com',
				method: 'get',
			})
		} catch (e) {
			dispatch(error('Ошибка запроса'))
			return
		}
		dispatch(success(result.data.products))
	}
	const [categories, setCategories] = useState<String[]>()
	const fetchCategories = async (): Promise<void> => {
		let result
		try {
			result = await axios({
				url: `/products/category-list`,
				baseURL: 'https://dummyjson.com',
				method: 'get',
			})
		} catch (e) {
			return
		}
		setCategories(result.data)
	}

	const scrollUp = () => {
		window.scrollTo(0, 0)
	}

	const fetchNextProduct = async () => {
		if (products == undefined) {
			return
		}
		if (products.length < 10) {
			setCurentPage(0)
			fetchProducts(10, 0)
			return
		}
		setCurentPage(++curentPage)
		fetchProducts(10, curentPage)
		scrollUp()
	}
	const productsBuilder = (): ReactNode => {
		switch (status) {
			case ProductsRequestStatus.stock:
			case ProductsRequestStatus.loading:
				return skeletonArray.map((el, index) => (
					<SkeletonProductCard key={index++} />
				))
			case ProductsRequestStatus.success:
				return products?.map(product => (
					<ProductCard key={product.id} product={product} />
				))
			case ProductsRequestStatus.error:
				return <h1>{errorMessage}</h1>
			default:
				return <h1>Oops!</h1>
		}
	}
	const fetchPreviosProduct = () => {
		if (curentPage == 0) {
			return
		}
		setCurentPage(--curentPage)
		fetchProducts(10, curentPage)
		scrollUp()
	}
	const skeletonArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

	const [burgerIsOpen, setBurgerIsOpen] = useState<boolean>(false)

	useLayoutEffect(() => {
		fetchProducts(10, curentPage)
		fetchCategories()
	}, [])
	return (
		<div className='products_page'>
			<Header
				leading={
					<button
						className='burger_button'
						onClick={() => {
							setBurgerIsOpen(isOpen => (isOpen = !isOpen))
							document.body.id = !burgerIsOpen ? 'overflow-lock' : ''
						}}
					>
						+
					</button>
				}
			/>
			<div className='main'>
				<div className='products_container'>
					<div className={burgerIsOpen ? 'categories open' : 'categories'}>
						{categories?.map(e => (
							<h3>{e}</h3>
						))}
						{/* <Skeleton count={20} /> */}
					</div>
					<div className='products'>{productsBuilder()}</div>
				</div>

				<div className='pagination_container'>
					<div className='pagination_buttons'>
						<button
							disabled={curentPage == 0}
							className='previos_button'
							onClick={fetchPreviosProduct}
						>
							<ArrowSVG />
						</button>
						<h2 className='curent_page'>{curentPage + 1}</h2>
						<button className='next-button' onClick={fetchNextProduct}>
							<ArrowSVG />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
