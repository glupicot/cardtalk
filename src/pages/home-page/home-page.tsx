import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { Card } from '../../components/card/card';
import { ROUTES } from '../../constants/routes';
import type { Word } from '../../types/word';
import styles from './home-page.module.css';

const PREVIEW_WORDS: Word[] = [
	{
		id: 'benevolent',
		word: 'benevolent',
		partOfSpeech: 'adjective',
		example: 'a benevolent smile',
		translation: 'доброжелательный',
		topics: ['basics'],
	},
	{
		id: 'curious',
		word: 'curious',
		partOfSpeech: 'adjective',
		example: 'a curious mind',
		translation: 'любопытный',
		topics: ['basics'],
	},
];

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.home}>
			<div className={styles.left}>
				<h1 className={styles.title}>
					<span>Учи английский</span>
					<span className={styles.titleAccent}>по одной карточке</span>
					<span>в день</span>
				</h1>
				<p className={styles.text}>
					Это большой набор карточек для запоминания слов: читаешь слово,
					переворачиваешь, вспоминаешь перевод, забываешь, память-то девичья,
					переворачиваешь обратно и идёшь дальше. Смол степс, биг дрим, как говорится.
				</p>
				<Button
					variant="big"
					className={styles.homeButton}
					onClick={() => navigate(ROUTES.LOGIN)}
				>
					Войти на портал
				</Button>
			</div>

			<div className={styles.right}>
				<div className={`${styles.cardWrapper} ${styles.cardLeft}`}>
					<Card word={PREVIEW_WORDS[0]} />
				</div>
				<div className={`${styles.cardWrapper} ${styles.cardRight}`}>
					<Card word={PREVIEW_WORDS[1]} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;