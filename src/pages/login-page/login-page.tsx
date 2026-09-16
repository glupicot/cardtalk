import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { useLoginMutation } from '../../api/auth-api';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/user-slice';
import { ROUTES } from '../../constants/routes';
import { loginSchema, type LoginFormData } from '../../schemas/login-schema';
import styles from './login-page.module.css';

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loginRequest, { isLoading }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { login: '', password: '' },
		mode: 'onBlur',
	});

	const onSubmit = async (values: LoginFormData) => {
		try {
			const response = await loginRequest(values).unwrap();
			dispatch(setUser(response.name));
			navigate(ROUTES.CARDS);
		} catch {
			setError('password', { message: 'Неверный логин или пароль' });
		}
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={styles.title}>CardTalk</h1>
				<p className={styles.subtitle}>
					Войдите в аккаунт, чтобы получить персонализированную подборку карточек
				</p>

				<div className={styles.fields}>
					<Input
						placeholder="Логин"
						hasError={!!errors.login}
						{...register('login')}
					/>

					<Input
						type="password"
						placeholder="Пароль"
						hasError={!!errors.password}
						{...register('password')}
					/>
				</div>

				{(errors.login || errors.password) && (
					<p className={styles.error}>
						{errors.login?.message || errors.password?.message}
					</p>
				)}

				<Button variant="big" type="submit" disabled={isLoading}>
					{isLoading ? 'Загружаем...' : 'Войти'}
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;