import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user-slice'
import wordsReducer from './slices/words-slice'
import profileReducer from './slices/profile-slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordsReducer,
    profile: profileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>