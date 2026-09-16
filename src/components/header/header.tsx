import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/user-slice';
import { setProfile } from '../../store/slices/profile-slice';
import { useLogoutMutation } from '../../store/slices/auth-api';
import { LogoMiniIcon } from '../icons/logo-mini-icon';
import { ROUTES } from '../../constants/routes';
import styles from './header.module.css';

interface IHeaderProps {
	logo?: string;
	logoTo?: string;
}

export const Header = ({ logo = 'CardTalk', logoTo = ROUTES.HOME }: IHeaderProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const [logoutRequest] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutRequest().unwrap();
		} catch {
			// ignore
		} finally {
			dispatch(logout());
			dispatch(setProfile([]));
			navigate(ROUTES.LOGIN);
		}
	};

	return (
		<header className={styles.header}>
			<Link to={logoTo} className={styles.logo}>
				<LogoMiniIcon />
				<span>{logo}</span>
			</Link>

			<nav className={styles.nav}>
				{isAuth ? (
					<>
						<Button
							variant="tab"
							className={pathname === ROUTES.CARDS ? styles.active : ''}
							onClick={() => navigate(ROUTES.CARDS)}
						>
							Карточки
						</Button>
						<Button
							variant="tab"
							className={pathname === ROUTES.PROFILE ? styles.active : ''}
							onClick={() => navigate(ROUTES.PROFILE)}
						>
							Профиль
						</Button>
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