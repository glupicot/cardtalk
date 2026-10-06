import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonVariant = 'action' | 'tab' | 'big';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	children: ReactNode;
}

export const Button = ({ variant = 'action', className = '', children, ...props }: Props) => {
	return (
		<button className={clsx(styles.button, styles[variant], className)} {...props}>
			{children}
		</button>
	);
};
