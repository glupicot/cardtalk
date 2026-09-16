import type { ProfileField } from '../../types';
import { Field } from '../field/field';
import { Button } from '../button/button';
import { PROFILE_SECTIONS } from '../../constants/sections';
import styles from './edit-view.module.css';

interface Props {
	fields: ProfileField[];
	onChange: (name: string, value: ProfileField['value']) => void;
	onSave: () => void;
}

const isVisible = (field: ProfileField, allFields: ProfileField[]): boolean => {
	if (!field.visibleWhen) return true;
	const other = allFields.find((f) => f.name === field.visibleWhen!.field);
	return other?.value === field.visibleWhen.value;
};

const isDisabled = (field: ProfileField, allFields: ProfileField[]): boolean => {
	if (!field.disabledWhen) return false;
	const other = allFields.find((f) => f.name === field.disabledWhen!.field);
	return other?.value === field.disabledWhen.value;
};

export const EditView = ({ fields, onChange, onSave }: Props) => {
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
							.map((field) => fields.find((f) => f.name === field.name) ?? field)
							.filter((field) => isVisible(field, fields))
							.map((field) => (
								<Field
									key={field.name}
									field={field}
									disabled={isDisabled(field, fields)}
									onChange={onChange}
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