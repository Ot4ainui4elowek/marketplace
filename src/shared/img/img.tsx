'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Img = ({ src, alt, height, width }: IReactImage) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [imageUrl, setImageUrl] = useState<string>('')

	const loadImg = async () => {
		setIsLoading(true)
		try {
			await setTimeout(() => {}, 10000000)
			const img = await axios({ url: src, responseType: 'blob' })
			const imageUrl = URL.createObjectURL(img.data)
			await setTimeout(() => {}, 1000)
			setImageUrl(imageUrl ?? '/gif/image_error.gif')
		} catch (e) {
			setImageUrl('/gif/image_error.gif')
		}

		setIsLoading(false)
	}
	useEffect(() => {
		loadImg()
	}, [])
	return (
		<div>
			{isLoading ? (
				<Skeleton height={height} width={width} />
			) : (
				<img height={height} width={width} src={imageUrl} />
			)}
		</div>
	)
}
interface IReactImage {
	src: string
	alt?: string
	height?: string
	width?: string
}
