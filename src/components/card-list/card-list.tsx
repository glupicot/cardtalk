import { Card } from '../card/card';
import { Card as CardType } from '../../types';
import styles from './card-list.module.css';

interface Props {
	cards: CardType[];
}

export const CardList = ({ cards }: Props) => {
	return (
		<div className={styles.list}>
			{cards.map((card) => (
				<Card key={card.id} card={card} />
			))}
		</div>
	);
};