import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ROUTES } from '../../constants/routes';

interface Props {
	children: ReactNode;
}

export const GuestOnly = ({ children }: Props) => {
	const isAuth = useAppSelector((s) => s.user.isAuth);

	if (isAuth) return <Navigate to={ROUTES.CARDS} />;

	return <>{children}</>;
};