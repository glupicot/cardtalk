import { publicApi } from './api';

interface LoginRequest {
	login: string;
	password: string;
}

interface LoginResponse {
	name: string;
}

export const authApi = publicApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/authorization',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation } = authApi;