import { createSlice } from '@reduxjs/toolkit'
import type { Word } from '../../types'
import { WORDS } from '../../data/words'

const initialState: Word[] = WORDS

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
})

export default wordsSlice.reducer