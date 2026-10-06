import { forwardRef, type TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './textarea.module.css';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ hasError, className = '', ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={clsx(styles.textarea, hasError && styles.error, className)}
				{...props}

			/>
		);
	}
);

Textarea.displayName = 'Textarea';