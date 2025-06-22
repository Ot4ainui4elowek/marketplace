import { ReactNode } from 'react'
import s from './style.module.css'

export const Header = ({ leading, actions }: HeaderProps) => {
	return (
		<header className={s.header}>
			<div>{leading}</div>
			<h2>EWSEEWVA SHOP</h2>
			<div>{actions}</div>
		</header>
	)
}

interface HeaderProps {
	leading?: ReactNode
	actions?: ReactNode
}
