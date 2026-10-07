import { useState, useMemo } from 'react';
import { CardList } from '../../components/card-list/card-list';
import { TopicFilter } from '../../components/topic-filter/topic-filter';
import { useGetWordsQuery } from '../../store/slices/words-api';

const CardsPage = () => {
	const { data: words = [], isLoading } = useGetWordsQuery();
	const [selectedTopic, setSelectedTopic] = useState('');

	const topics = useMemo(() => {
		const set = new Set<string>();
		words.forEach((w) => w.topics.forEach((t) => set.add(t)));
		return Array.from(set);
	}, [words]);

	const filtered = useMemo(
		() => (selectedTopic === '' ? words : words.filter((w) => w.topics.includes(selectedTopic))),
		[words, selectedTopic]
	);

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<>
			<TopicFilter topics={topics} selected={selectedTopic} onSelect={setSelectedTopic} />
			<CardList words={filtered} />
		</>
	);
};

export default CardsPage;
