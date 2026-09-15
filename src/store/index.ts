import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';
import cardsReducer from './slices/cards-slice';
import profileReducer from './slices/profile-slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cards: cardsReducer,
		profile: profileReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;