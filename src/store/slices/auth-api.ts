import { api, publicApi } from './api';

interface LoginRequest {
	login: string;
	password: string;
}

interface LoginResponse {
	name: string;
}

export const authPublicApi = publicApi.injectEndpoints({
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

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<LoginResponse, void>({
			query: () => '/me',
			providesTags: ['User'],
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation } = authPublicApi;
export const { useGetMeQuery } = authApi;