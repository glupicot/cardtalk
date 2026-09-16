import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import styles from './not-found-page.module.css';

const NotFoundPage = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Мяу, это ошибка 404</h1>
			<p className={styles.text}>Такой страницы нет</p>
			<Link to={ROUTES.HOME} className={styles.link}>
				На главную
			</Link>
		</div>
	);
};

export default NotFoundPage;