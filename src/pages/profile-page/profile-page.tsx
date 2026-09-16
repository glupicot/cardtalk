import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditView } from '../../components/edit-view/edit-view';
import { Toast } from '../../components/toast/toast';
import { useAppSelector } from '../../store/hooks';
import { useGetProfileQuery, useSaveProfileMutation } from '../../store/slices/profile-api';
import { PROFILE_SECTIONS } from '../../constants/sections';
import { profileSchema, type ProfileFormData } from '../../schemas/profile-schema';
import { ROUTES } from '../../constants/routes';
import type { ProfileValues } from '../../types/profile';

interface IToast {
	message: string;
	type: 'success' | 'error';
}

const defaultValues: ProfileFormData = Object.fromEntries(
	PROFILE_SECTIONS
		.flatMap((section) => section.fields)
		.map((field) => [field.name, field.value])
) as ProfileFormData;

const ProfilePage = () => {
	const login = useAppSelector((s) => s.user.login);
	const navigate = useNavigate();
	const [toast, setToast] = useState<IToast | null>(null);

	const { data, isSuccess, isLoading } = useGetProfileQuery(undefined, { skip: !login });
	const [saveProfile] = useSaveProfileMutation();

	const {
		register,
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues,
		mode: 'onBlur',
	});

	useEffect(() => {
		if (isSuccess && data) {
			reset({ ...defaultValues, ...data } as ProfileFormData, { keepDirty: false });
		}
	}, [isSuccess, data, reset]);

	if (!login) return <Navigate to={ROUTES.HOME} />;
	if (isLoading) return <div className="loader">Загрузка профиля...</div>;

	const onSubmit = async (values: ProfileFormData) => {
		try {
			const payload: ProfileValues = Object.fromEntries(
				Object.entries(values).filter(([k]) => k in values)
			);
			await saveProfile(payload).unwrap();
			setToast({ message: 'Профиль сохранён', type: 'success' });
			setTimeout(() => navigate(ROUTES.CARDS), 800);
		} catch {
			setToast({ message: 'Не удалось сохранить профиль', type: 'error' });
		}
	};

	return (
		<>
			<EditView
				register={register}
				control={control}
				errors={errors}
				watch={watch}
				onSave={handleSubmit(onSubmit)}
			/>
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