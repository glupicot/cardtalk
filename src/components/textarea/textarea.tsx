import type { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './textarea.module.css';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	hasError?: boolean;
}

export const Textarea = ({ hasError, className, ...props }: ITextareaProps) => {
	return (
		<textarea
			className={clsx(styles.textarea, hasError && styles.error, className)}
			{...props}
		/>
	);
};
