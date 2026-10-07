import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectLogin } from '../../store/selectors';
import { ROUTES } from '../../constants/routes';

export const GuestOnly = () => {
	const login = useAppSelector(selectLogin);

	if (login) return <Navigate to={ROUTES.CARDS} replace />;

	return <Outlet />;
};