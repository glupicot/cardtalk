import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/input/input'
import { Button } from '../../components/button/button'
import { authService } from '../../services/auth-service'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/slices/user-slice'
import { ROUTES } from '../../constants/routes'
import styles from './login-page.module.css'

type FormValues = {
  login: string
  password: string
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { login: '', password: '' },
  })

  const onSubmit = async (values: FormValues) => {
    const ok = await authService.login(values.login, values.password)

    if (ok) {
      dispatch(setUser(values.login))
      navigate(ROUTES.CARDS)
    } else {
      setError('password', { message: 'Неверный логин или пароль' })
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>CardTalk</h1>
        <p className={styles.subtitle}>Войдите, чтобы продолжить обучение</p>

        <div className={styles.fields}>
          <Input
            placeholder="Логин"
            hasError={!!errors.login}
            {...register('login', { required: 'Введите логин' })}
          />

          <Input
            type="password"
            placeholder="Пароль"
            hasError={!!errors.password}
            {...register('password', { required: 'Введите пароль' })}
          />
        </div>

        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <Button variant="big" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Входим...' : 'Войти'}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage