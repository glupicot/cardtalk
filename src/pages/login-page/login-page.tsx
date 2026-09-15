import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { authService } from '../../services/auth-service';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/user-slice';
import styles from './login-page.module.css';

const LoginPage = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');

		const ok = await authService.login(login, password);
		if (ok) {
			dispatch(setUser(login));
			navigate('/cards');
		} else {
			setError('Неверный логин или пароль');
		}
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>CardTalk</h1>
				<p className={styles.subtitle}>Войдите, чтобы продолжить обучение</p>

				<div className={styles.fields}>
					<Input
						placeholder="Логин"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>

					<Input
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						hasError={!!error}
					/>
				</div>

				{error && <p className={styles.error}>{error}</p>}

				<button className={styles.button} type="submit">
					Войти
				</button>
			</form>
		</div>
	);
};

export default LoginPage;