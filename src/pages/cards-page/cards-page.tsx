import { Navigate } from 'react-router-dom';
import { CardList } from '../../components/card-list/card-list';
import { useAppSelector } from '../../store/hooks';

const CardsPage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const cards = useAppSelector((s) => s.cards);

	if (!isAuth) return <Navigate to="/login" />;

	return <CardList cards={cards} />;
};

export default CardsPage;