import { api } from './api';

interface LoginRequest {
	login: string;
	password: string;
}

interface LoginResponse {
	name: string;
}

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/authorization',
				method: 'POST',
				body: credentials,
			}),
			extraOptions: { skipReauth: true },
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
			extraOptions: { skipReauth: true },
			invalidatesTags: ['User', 'Profile', 'Words'],
		}),
		getMe: builder.query<LoginResponse, void>({
			query: () => '/me',
			providesTags: ['User'],
			extraOptions: { skipReauth: true },
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;