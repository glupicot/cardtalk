import styles from './footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.left}>
				<span className={styles.brand}>CardTalk</span>
				<span className={styles.note}>Тестовое задание</span>
			</div>

			<div className={styles.right}>
				<div className={styles.contact}>
					<span className={styles.label}>Служба поддержки:</span>
					<span className={styles.value}>helpcardtalk@learn.com</span>
				</div>
				<div className={styles.contact}>
					<span className={styles.label}>Горячая линия:</span>
					<span className={styles.value}>+7 (999) 123 45-67</span>
				</div>
			</div>
		</footer>
	);
};