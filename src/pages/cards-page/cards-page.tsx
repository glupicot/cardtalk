import { Navigate } from 'react-router-dom'
import { CardList } from '../../components/card-list/card-list'
import { useAppSelector } from '../../store/hooks'

const CardsPage = () => {
  const isAuth = useAppSelector((s) => s.user.isAuth)
  const words = useAppSelector((s) => s.words)

  if (!isAuth) return <Navigate to="/login" />

  return <CardList words={words} />
}

export default CardsPage