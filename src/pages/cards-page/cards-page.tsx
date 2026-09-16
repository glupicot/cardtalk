import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { CardList } from '../../components/card-list/card-list';
import { TopicFilter } from '../../components/topic-filter/topic-filter';
import { useAppSelector } from '../../store/hooks';
import { useGetWordsQuery } from '../../api/words-api';

const CardsPage = () => {
	const isAuth = useAppSelector((s) => s.user.isAuth);
	const { data: words = [], isLoading } = useGetWordsQuery();
	const [selectedTopic, setSelectedTopic] = useState('');

	const topics = useMemo(() => {
		const set = new Set<string>();
		words.forEach((w) => w.topics.forEach((t) => set.add(t)));
		return Array.from(set);
	}, [words]);

	const filtered = useMemo(
		() =>
			selectedTopic === ''
				? words
				: words.filter((w) => w.topics.includes(selectedTopic)),
		[words, selectedTopic]
	);

	if (!isAuth) return <Navigate to="/login" />;
	if (isLoading) return <div>Загрузка...</div>;

	return (
		<>
			<TopicFilter
				topics={topics}
				selected={selectedTopic}
				onSelect={setSelectedTopic}
			/>
			<CardList words={filtered} />
		</>
	);
};

export default CardsPage;