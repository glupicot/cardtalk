import { useState } from 'react'
import type { Word } from '../../types'
import { getRandomTitle } from '../../utils/titles-utils'
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
          <button className={styles.action} onClick={() => setFlipped(true)}>
            ПЕРЕВОД
          </button>
        </div>

        <div className={styles.back}>
          <span className={styles.title}>{title}</span>
          <p className={styles.word}>{word.word}</p>
          <p className={styles.translation}>{word.translation}</p>
          <button className={styles.action} onClick={() => setFlipped(false)}>
            НАЗАД
          </button>
        </div>
      </div>
    </div>
  )
}