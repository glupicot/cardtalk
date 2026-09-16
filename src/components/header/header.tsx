import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../button/button'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/user-slice'
import { ROUTES } from '../../constants/routes'
import styles from './header.module.css'

interface ITab {
  id: string
  label: string
  to: string
}

interface IHeaderProps {
  logo?: string
  logoTo?: string
  tabs: ITab[]
}

export const Header = ({
  logo = 'CardTalk',
  logoTo = ROUTES.HOME,
  tabs,
}: IHeaderProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector((s) => s.user.isAuth)
  const login = useAppSelector((s) => s.user.login)

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  return (
    <header className={styles.wrapper}>
      <Link to={logoTo} className={styles.logo}>
        {logo}
      </Link>

      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="tab"
            className={pathname === tab.to ? styles.active : ''}
            onClick={() => navigate(tab.to)}
          >
            {tab.label}
          </Button>
        ))}

        {isAuth ? (
          <div className={styles.user}>
            <span>{login}</span>
            <Button variant="action" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        ) : (
          <Button
            variant="action"
            className={pathname === ROUTES.LOGIN ? styles.active : ''}
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Войти
          </Button>
        )}
      </nav>
    </header>
  )
}