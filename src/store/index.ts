import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import userReducer from './slices/user-slice';
import profileReducer from './slices/profile-slice';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		user: userReducer,
		profile: profileReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;