import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { api, publicApi } from './slices/api';
import { authApi } from './slices/auth-api';
import userReducer, { logout } from './slices/user-slice';

const sessionListener = createListenerMiddleware();

sessionListener.startListening({
	matcher: isAnyOf(logout, authApi.endpoints.logout.matchFulfilled),
	effect: (_action, listenerApi) => {
		listenerApi.dispatch(api.util.resetApiState());
		listenerApi.dispatch(publicApi.util.resetApiState());
	},
});

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[publicApi.reducerPath]: publicApi.reducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.prepend(sessionListener.middleware)
			.concat(api.middleware, publicApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;