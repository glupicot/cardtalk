import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/user-slice'
import { ROUTES } from '../../constants/routes'
import styles from './nav-panel.module.css'

interface ITab {
  id: string
  label: string
  to: string
}

interface INavPanelProps {
  logo?: string
  logoTo?: string
  tabs: ITab[]
}

export const NavPanel = ({
  logo = 'CardTalk',
  logoTo = ROUTES.HOME,
  tabs,
}: INavPanelProps) => {
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
          <button
            key={tab.id}
            className={`${styles.tab} ${pathname === tab.to ? styles.active : ''}`}
            onClick={() => navigate(tab.to)}
          >
            {tab.label}
          </button>
        ))}

        {isAuth ? (
          <div className={styles.user}>
            <span>{login}</span>
            <button className={styles.logout} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : (
          <button
            className={`${styles.tab} ${pathname === ROUTES.LOGIN ? styles.active : ''}`}
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Войти
          </button>
        )}
      </nav>
    </header>
  )
}