import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EditView } from '../../components/edit-view/edit-view';
import { Toast } from '../../components/toast/toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFields, setProfile } from '../../store/slices/profile-slice';
import { setUser } from '../../store/slices/user-slice';
import { useGetProfileQuery, useSaveProfileMutation } from '../../api/profile-api';
import { PROFILE_FIELDS } from '../../constants/profile';
import { ROUTES } from '../../constants/routes';
import type { ProfileField } from '../../types';

interface IToast {
	message: string;
	type: 'success' | 'error';
}

const ProfilePage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const fields = useAppSelector((s) => s.profile);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [toast, setToast] = useState<IToast | null>(null);

	const { data, isSuccess } = useGetProfileQuery();
	const [saveProfile] = useSaveProfileMutation();

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setProfile(data));
		}
	}, [isSuccess, data, dispatch]);

	if (!isAuth) return <Navigate to="/login" />;

	const handleChange = (name: string, value: ProfileField['value']) => {
		const updates: Array<{ name: string; value: ProfileField['value'] }> = [
			{ name, value },
		];

		const updated = fields.map((f) => (f.name === name ? { ...f, value } : f));

		PROFILE_FIELDS.forEach((field) => {
			if (field.disabledWhen?.field === name) {
				const other = updated.find((f) => f.name === name);
				const shouldDisable = other?.value === field.disabledWhen.value;

				if (shouldDisable && field.valueWhenDisabled !== undefined) {
					updates.push({ name: field.name, value: field.valueWhenDisabled });
				} else if (!shouldDisable) {
					updates.push({ name: field.name, value: '' });
				}
			}
		});

		dispatch(updateFields(updates));
	};

	const handleSave = async () => {
		try {
			await saveProfile(fields).unwrap();

			const firstName = fields.find((f) => f.name === 'firstName');
			if (firstName && typeof firstName.value === 'string' && firstName.value.trim()) {
				dispatch(setUser(firstName.value));
			}

			setToast({ message: 'Профиль сохранён', type: 'success' });
			setTimeout(() => navigate(ROUTES.CARDS), 800);
		} catch {
			setToast({ message: 'Не удалось сохранить профиль', type: 'error' });
		}
	};

	return (
		<>
			<EditView fields={fields} onChange={handleChange} onSave={handleSave} />
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
		</>
	);
};

export default ProfilePage;