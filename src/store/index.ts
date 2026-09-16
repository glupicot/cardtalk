import { configureStore } from '@reduxjs/toolkit';
import { api, publicApi } from './slices/api';
import userReducer from './slices/user-slice';
import profileReducer from './slices/profile-slice';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[publicApi.reducerPath]: publicApi.reducer,
		user: userReducer,
		profile: profileReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware, publicApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;