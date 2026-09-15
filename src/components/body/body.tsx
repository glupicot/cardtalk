import { ReactNode } from 'react';
import styles from './body.module.css';

interface Props {
	children: ReactNode;
}

export const Body = ({ children }: Props) => {
	return <main className={styles.body}>{children}</main>;
};