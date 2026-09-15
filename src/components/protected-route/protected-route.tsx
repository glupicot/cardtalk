import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from "../../store/hooks"; 
import { ROUTES } from '../../constants/routes'

export const ProtectedRoute = () => {
  const isAuth = useAppSelector((s) => s.user.isAuth)

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}