import type { ProfileField } from '../../types/profile';

export interface FieldProps {
	field: ProfileField;
	disabled?: boolean;
	onChange: (name: string, value: ProfileField['value']) => void;
}