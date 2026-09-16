import { useState } from 'react'
import type { Word } from '../../types'
import { getRandomTitle } from '../../utils/titles-utils'
import { Button } from '../button/button'
import styles from './card.module.css'

interface Props {
  word: Word
}

export const Card = ({ word }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const [title] = useState(() => getRandomTitle())

  return (
    <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <span className={styles.title}>{title}</span>
          <p className={styles.word}>{word.word}</p>
          <p className={styles.pos}>{word.partOfSpeech}</p>
          <p className={styles.example}>{word.example}</p>
          <Button variant="action" onClick={() => setFlipped(true)}>
            Узнать перевод
          </Button>
        </div>

        <div className={styles.back}>
          <span className={styles.title}>{title}</span>
          <div className={styles.pair}>
            <span className={styles.word}>{word.word}</span>
            <span className={styles.equals}>=</span>
            <span className={styles.translation}>{word.translation}</span>
          </div>
          <Button variant="action" onClick={() => setFlipped(false)}>
            Перевернуть обратно
          </Button>
        </div>
      </div>
    </div>
  )
}