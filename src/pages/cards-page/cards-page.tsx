import { Navigate } from 'react-router-dom';
import { CardList } from '../../components/card-list/card-list';
import { useAppSelector } from '../../store/hooks';
import { useGetWordsQuery } from '../../api/words-api';

const CardsPage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const { data: words = [], isLoading } = useGetWordsQuery();

	if (!isAuth) return <Navigate to="/login" />;
	if (isLoading) return <div>Загрузка...</div>;

	return <CardList words={words} />;
};

export default CardsPage;