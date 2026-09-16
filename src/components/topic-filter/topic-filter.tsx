import styles from './topic-filter.module.css';

interface Props {
	topics: string[];
	selected: string;
	onSelect: (topic: string) => void;
}

export const TopicFilter = ({ topics, selected, onSelect }: Props) => {
	return (
		<div className={styles.filter}>
			<button
				className={`${styles.tab} ${selected === '' ? styles.active : ''}`}
				onClick={() => onSelect('')}
			>
				Все
			</button>
			{topics.map((topic) => (
				<button
					key={topic}
					className={`${styles.tab} ${selected === topic ? styles.active : ''}`}
					onClick={() => onSelect(topic)}
				>
					{topic}
				</button>
			))}
		</div>
	);
};