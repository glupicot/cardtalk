import { useEffect } from 'react';
import clsx from 'clsx';
import styles from './toast.module.css';

interface Props {
	message: string;
	type?: 'success' | 'error';
	onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: Props) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className={clsx(styles.toast, styles[type])}>{message}</div>;
};