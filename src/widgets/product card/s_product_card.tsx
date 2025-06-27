import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './style.module.css'

export const SkeletonProductCard = () => {
	return (
		<div className={s.productCard}>
			<Skeleton height={176} />
			<Skeleton count={3} />
		</div>
	)
}
