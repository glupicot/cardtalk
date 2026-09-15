import { CardList } from '../../components/card-list/card-list'

import { useAppSelector } from "../../store/hooks";
const CardsPage = () => {
  const words = useAppSelector((s) => s.words)

  return <CardList words={words} />
}

export default CardsPage 