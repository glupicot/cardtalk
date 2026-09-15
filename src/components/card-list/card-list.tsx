import { Card } from '../card/card'
import type { Word } from '../../types'
import styles from './card-list.module.css'

interface Props {
  words: Word[]
}

export const CardList = ({ words }: Props) => {
  return (
    <div className={styles.list}>
      {words.map((word) => (
        <Card key={word.id} word={word} />
      ))}
    </div>
  )
}