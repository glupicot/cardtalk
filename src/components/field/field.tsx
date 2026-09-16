import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { ProfileField } from '../../types/profile';
import type { ProfileFormData } from '../../schemas/profile-schema';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Checkbox } from '../checkbox/checkbox';
import { Radio } from '../radio/radio';
import { Textarea } from '../textarea/textarea';
import styles from './field.module.css';

interface Props {
	field: ProfileField;
	register: UseFormRegister<ProfileFormData>;
	control: Control<ProfileFormData>;
	errors: FieldErrors<ProfileFormData>;
	disabled?: boolean;
}

const INPUT_TYPES = ['text', 'number', 'textarea', 'date'];

export const Field = ({ field, register, control, errors, disabled }: Props) => {
	const error = errors[field.name as keyof ProfileFormData];
	const errorMessage = typeof error?.message === 'string' ? error.message : undefined;
	const hasHtmlFor = INPUT_TYPES.includes(field.type);

	const renderControl = () => {
		switch (field.type) {
			case 'text':
				return (
					<Input
						id={field.name}
						type="text"
						{...register(field.name as keyof ProfileFormData)}
						disabled={disabled}
						hasError={!!error}
					/>
				);
			case 'number':
				return (
					<Input
						id={field.name}
						type="text"
						inputMode="numeric"
						{...register(field.name as keyof ProfileFormData)}
						disabled={disabled}
						hasError={!!error}
					/>
				);
			case 'textarea':
				return (
					<Textarea
						id={field.name}
						{...register(field.name as keyof ProfileFormData)}
						disabled={disabled}
						hasError={!!error}
					/>
				);
			case 'date':
				return (
					<Input
						id={field.name}
						type="date"
						{...register(field.name as keyof ProfileFormData)}
						disabled={disabled}
						hasError={!!error}
					/>
				);
			case 'select':
				return (
					<Controller
						name={field.name as keyof ProfileFormData}
						control={control}
						render={({ field: rhfField }) => (
							<Select
								options={field.options.map((o) => ({ value: o, label: o }))}
								value={(rhfField.value as string) ?? ''}
								onChange={rhfField.onChange}
								disabled={disabled}
								placeholder="Выберите..."
							/>
						)}
					/>
				);
			case 'checkbox':
				return (
					<Controller
						name={field.name as keyof ProfileFormData}
						control={control}
						render={({ field: rhfField }) => (
							<Checkbox
								name={field.name}
								options={field.options}
								value={rhfField.value as string[]}
								onChange={rhfField.onChange}
								disabled={disabled}
							/>
						)}
					/>
				);
			case 'radio':
				return (
					<Controller
						name={field.name as keyof ProfileFormData}
						control={control}
						render={({ field: rhfField }) => (
							<Radio
								name={field.name}
								options={field.options}
								value={rhfField.value as string}
								onChange={rhfField.onChange}
								disabled={disabled}
							/>
						)}
					/>
				);
		}
	};

	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={hasHtmlFor ? field.name : undefined}>
				{field.label}
			</label>
			{renderControl()}
			{errorMessage && <span className={styles.error}>{errorMessage}</span>}
		</div>
	);
};