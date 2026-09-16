import { MOTIVATION_TITLES } from '../constants/motivation-titles' 

export function getRandomTitle(): string {
  return MOTIVATION_TITLES[Math.floor(Math.random() * MOTIVATION_TITLES.length)]
}