import { InputHTMLAttributes } from 'react';
import styles from './input.module.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean;
}

export const Input = ({ hasError, className = '', ...props }: IInputProps) => {
	return (
		<input
			className={`${styles.input} ${hasError ? styles.error : ''} ${className}`}
			{...props}
		/>
	);
};