import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx';
import styles from './input.module.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ hasError, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, hasError && styles.error, className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'