import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './input.module.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean;
}

export const Input = ({ hasError, className, ...props }: IInputProps) => {
	return (
		<input
			className={clsx(styles.input, hasError && styles.error, className)}
			{...props}
		/>
	);
};
