'use client'
import { IProduct } from '@/entities/products'

import { Img } from '@/shared/img/img'
import s from './style.module.css'

export const ProductCard = (props: props) => {
	let { product } = props
	return (
		<div className={s.productCard} key={String(product)}>
			<div className={s.img}>
				<Img
					src={product.images[0]}
					alt='Фотография продукта'
					width='176'
					height='176'
				/>
			</div>

			<h3>{product.title}</h3>
			<h3 className={s.price}>{product.price}$</h3>
		</div>
	)
}

interface props {
	product: IProduct
}
