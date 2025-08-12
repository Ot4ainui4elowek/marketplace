import { FC, ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
interface IWEbPortalProps {
	children: ReactNode
	show?: boolean
	onclose?: () => void
	selector: string
}

export const WebPortal: FC<IWEbPortalProps> = ({
	children,
	onclose,
	selector,
	show,
}) => {
	const ref = useRef<Element | null>(null)
	useEffect(() => {
		ref.current = document.getElementById('web-portal')
	}, [selector])

	return show && ref.current ? createPortal(children, ref.current) : null
}
