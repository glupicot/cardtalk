import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EditView } from '../../components/edit-view/edit-view';
import { Toast } from '../../components/toast/toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFields, setProfile } from '../../store/slices/profile-slice';
import { useGetProfileQuery, useSaveProfileMutation } from '../../store/slices/profile-api';
import { PROFILE_SECTIONS } from '../../constants/sections';
import { ROUTES } from '../../constants/routes';
import type { ProfileField, ProfileValues } from '../../types/profile';

interface IToast {
	message: string;
	type: 'success' | 'error';
}

const ProfilePage = () => {
	const login = useAppSelector((s) => s.user.login);
	const fields = useAppSelector((s) => s.profile);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [toast, setToast] = useState<IToast | null>(null);

	const { data, isSuccess } = useGetProfileQuery();
	const [saveProfile] = useSaveProfileMutation();

	useEffect(() => {
		if (!isSuccess || !data) return;

		const merged: ProfileField[] = PROFILE_SECTIONS
			.flatMap((section) => section.fields)
			.map((field) => ({
				...field,
				value: data[field.name] ?? field.value,
			})) as ProfileField[];

		dispatch(setProfile(merged));
	}, [isSuccess, data, dispatch]);

	if (!login) return <Navigate to={ROUTES.HOME} />;

	const handleChange = (name: string, value: ProfileField['value']) => {
		const updates: Array<{ name: string; value: ProfileField['value'] }> = [
			{ name, value },
		];

		const updated = fields.map((f) => (f.name === name ? { ...f, value } : f));

		fields.forEach((field) => {
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
			const values: ProfileValues = Object.fromEntries(
				fields.map((f) => [f.name, f.value])
			);
			await saveProfile(values).unwrap();

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