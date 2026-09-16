import { forwardRef, type TextareaHTMLAttributes } from 'react';
import styles from './textarea.module.css';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ hasError, className = '', ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={`${styles.textarea} ${hasError ? styles.error : ''} ${className}`}
				{...props}
                
			/>
		);
	}
);

Textarea.displayName = 'Textarea';