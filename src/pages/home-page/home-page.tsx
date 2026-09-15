import styles from './home-page.module.css';

const HomePage = () => {
	return (
		<div className={styles.home}>
			<h1>CardTalk</h1>
			<p>Приложение для изучения иностранных слов. Карточки, перевод, профиль.</p>
		</div>
	);
};

export default HomePage;