import type { ReactNode } from 'react'
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface IHeaderLink {
	to: string;
	label: string;
}

interface IHeaderProps {
	logo?: string;
	logoTo?: string;
	links?: IHeaderLink[];
	children?: ReactNode;
}

export const Header = ({ logo = 'CardTalk', logoTo = '/', links = [], children }: IHeaderProps) => {
	return (
		<header className={styles.header}>
			<Link to={logoTo} className={styles.logo}>
				{logo}
			</Link>
			<nav className={styles.nav}>
				{links.map((link) => (
					<Link key={link.to} to={link.to} className={styles.link}>
						{link.label}
					</Link>
				))}
				{children}
			</nav>
		</header>
	);
};