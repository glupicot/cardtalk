import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EditView } from '../../components/edit-view/edit-view';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateField, setProfile } from '../../store/slices/profile-slice';
import { setUser } from '../../store/slices/user-slice';
import { useGetProfileQuery, useSaveProfileMutation } from '../../api/profile-api';
import { PROFILE_FIELDS } from '../../constants/profile';
import { ROUTES } from '../../constants/routes';
import type { ProfileField } from '../../types';

const ProfilePage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const fields = useAppSelector((s) => s.profile);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { data, isSuccess } = useGetProfileQuery();
	const [saveProfile] = useSaveProfileMutation();

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setProfile(data));
		}
	}, [isSuccess, data, dispatch]);

	if (!isAuth) return <Navigate to="/login" />;

	const handleChange = (name: string, value: ProfileField['value']) => {
		dispatch(updateField({ name, value }));

		const updated = fields.map((f) => (f.name === name ? { ...f, value } : f));

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

	const handleSave = async () => {
		try {
			await saveProfile(fields).unwrap();

			const firstName = fields.find((f) => f.name === 'firstName');
			if (firstName && typeof firstName.value === 'string' && firstName.value.trim()) {
				dispatch(setUser(firstName.value));
			}

			navigate(ROUTES.CARDS);
		} catch {
			alert('Не удалось сохранить профиль');
		}
	};

	return <EditView fields={fields} onChange={handleChange} onSave={handleSave} />;
};

export default ProfilePage;