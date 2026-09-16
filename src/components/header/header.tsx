import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/user-slice';
import { useLogoutMutation } from '../../store/slices/auth-api';
import { LogoMiniIcon } from '../icons/logo-mini-icon';
import { ROUTES } from '../../constants/routes';
import styles from './header.module.css';

const AUTH_TABS = [
	{ id: 'cards', label: 'Карточки', to: ROUTES.CARDS },
	{ id: 'profile', label: 'Профиль', to: ROUTES.PROFILE },
];

export const Header = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const login = useAppSelector((s) => s.user.login);
	const [logoutRequest] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutRequest().unwrap();
		} catch (error) {
			console.error('Logout request failed:', error);
		} finally {
			dispatch(logout());
			navigate(ROUTES.HOME);
		}
	};

	return (
		<header className={styles.header}>
			<Link to={ROUTES.HOME} className={styles.logo}>
				<LogoMiniIcon />
				<span>CardTalk</span>
			</Link>

			<nav className={styles.nav}>
				{login ? (
					<>
						{AUTH_TABS.map((tab) => (
							<Button
								key={tab.id}
								variant="tab"
								className={pathname === tab.to ? styles.active : ''}
								onClick={() => navigate(tab.to)}
							>
								{tab.label}
							</Button>
						))}
						<Button variant="action" onClick={handleLogout}>
							Выйти
						</Button>
					</>
				) : (
					<Button variant="action" onClick={() => navigate(ROUTES.LOGIN)}>
						Войти
					</Button>
				)}
			</nav>
		</header>
	);
};