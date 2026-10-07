import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectLogin } from '../../store/selectors';
import { ROUTES } from '../../constants/routes';

export const ProtectedRoute = () => {
	const login = useAppSelector(selectLogin);

	if (!login) return <Navigate to={ROUTES.HOME} replace />;

	return <Outlet />;
};