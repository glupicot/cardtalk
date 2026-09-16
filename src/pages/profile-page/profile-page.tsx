import { Navigate } from 'react-router-dom';
import { EditView } from '../../components/edit-view/edit-view';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateField, setProfile } from '../../store/slices/profile-slice';
import { PROFILE_FIELDS } from '../../constants/profile';
import type { ProfileField } from '../../types';

const ProfilePage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const fields = useAppSelector((s) => s.profile);
	const dispatch = useAppDispatch();

	if (!isAuth) return <Navigate to="/login" />;

	const handleChange = (name: string, value: ProfileField['value']) => {
		dispatch(updateField({ name, value }));

		const updated = fields.map((f) =>
			f.name === name ? { ...f, value } : f
		);

		PROFILE_FIELDS.forEach((field) => {
			if (field.disabledWhen?.field === name) {
				const other = updated.find((f) => f.name === name);
				const shouldDisable = other?.value === field.disabledWhen.value;

				if (shouldDisable && field.valueWhenDisabled !== undefined) {
					dispatch(updateField({ name: field.name, value: field.valueWhenDisabled }));
				} else if (!shouldDisable) {
					dispatch(updateField({ name: field.name, value: '' }));
				}
			}
		});
	};
	const handleSave = () => {
		console.log('Сохранить:', fields);
	};

	return <EditView fields={fields} onChange={handleChange} onSave={handleSave} />;
};

export default ProfilePage;