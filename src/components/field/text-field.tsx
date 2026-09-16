import type { TextField as TextFieldType } from '../../types'
import type { FieldProps } from './types'
import styles from './field.module.css'

interface Props extends FieldProps<TextFieldType> {}

export const TextField = ({ field, disabled, onChange }: Props) => {
  return (
    <input
      id={field.name}
      name={field.name}
      type="text"
      className={styles.control}
      value={field.value}
      disabled={disabled}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  )
}