import type { ProfileField } from '../../types'

export interface FieldProps<T extends ProfileField = ProfileField> {
  field: T
  disabled?: boolean
  onChange: (name: string, value: ProfileField['value']) => void
}