import styles from './footer.module.css';

interface Props {
	contacts: { email: string; phone: string };
}

export const Footer = ({ contacts }: Props) => {
	return (
		<footer className={styles.footer}>
			<span>{contacts.email}</span>
			<span>{contacts.phone}</span>
		</footer>
	);
};