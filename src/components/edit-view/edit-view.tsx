import type { Control, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { ProfileField } from '../../types/profile';
import type { ProfileFormData } from '../../schemas/profile-schema';
import { Field } from '../field/field';
import { Button } from '../button/button';
import { PROFILE_SECTIONS } from '../../constants/sections';
import styles from './edit-view.module.css';

interface Props {
	register: UseFormRegister<ProfileFormData>;
	control: Control<ProfileFormData>;
	errors: FieldErrors<ProfileFormData>;
	watch: UseFormWatch<ProfileFormData>;
	onSave: () => void;
}

const isVisible = (field: ProfileField, values: ProfileFormData): boolean => {
	if (!field.visibleWhen) return true;
	return values[field.visibleWhen.field as keyof ProfileFormData] === field.visibleWhen.value;
};

const isDisabled = (field: ProfileField, values: ProfileFormData): boolean => {
	if (!field.disabledWhen) return false;
	return values[field.disabledWhen.field as keyof ProfileFormData] === field.disabledWhen.value;
};

export const EditView = ({ register, control, errors, watch, onSave }: Props) => {
	const values = watch();

	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				onSave();
			}}
		>
			{PROFILE_SECTIONS.map((section) => (
				<section key={section.id} className={styles.section}>
					<h2 className={styles.sectionTitle}>{section.title}</h2>
					<div className={styles.sectionGrid}>
						{section.fields
							.filter((field) => isVisible(field, values))
							.map((field) => (
								<Field
									key={field.name}
									field={field}
									register={register}
									control={control}
									errors={errors}
									disabled={isDisabled(field, values)}
								/>
							))}
					</div>
				</section>
			))}

			<Button variant="big" className={styles.button} type="submit">
				Сохранить
			</Button>
		</form>
	);
};