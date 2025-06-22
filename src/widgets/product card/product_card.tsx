import { IProduct } from '@/entities/products'
import s from './style.module.css'

export const ProductCard = (props: props) => {
	let { product } = props
	return (
		<div className={s.productCard} key={String(product)}>
			<img src={product.images[0]} alt='Фотография продукта' />
			<h3>{product.title}</h3>
			<h3 className={s.price}>{product.price}$</h3>
		</div>
	)
}

interface props {
	product: IProduct
}
