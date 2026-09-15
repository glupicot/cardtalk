import { useState } from 'react';
import { Card as CardType } from '../../types';
import styles from './card.module.css';

interface Props {
    card: CardType;
}

export const Card = ({ card }: Props) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`${styles.card} ${flipped ? styles.flipped : ''}`}
            onClick={() => setFlipped(!flipped)}
        >
            <div className={styles.inner}>
                <div className={styles.front}>
                    <span className={styles.title}>{card.title}</span>
                    <p className={styles.word}>{card.word}</p>
                    <p className={styles.example}>{card.example}</p>
                    <span className={styles.action}>Learn more</span>
                </div>
                <div className={styles.back}>
                    <span className={styles.title}>{card.title}</span>
                    <p className={styles.translation}>{card.translation}</p>
                    <span className={styles.action}>Назад</span>
                </div>
            </div>
        </div>
    );
};