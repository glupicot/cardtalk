import styles from './home-page.module.css';

export const HomePage = () => {
	return (
		<div className={styles.home}>
			<h1>CardTalk</h1>
			<p>Приложение для самого крутого и не абьюзерского изучения иностранных слов. Карточки, перевод, профиль.</p>
		</div>
	);
};