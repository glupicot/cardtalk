import { api } from './api';
import type { ProfileValues } from '../../types/profile';

export const profileApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<ProfileValues, void>({
			query: () => '/profile',
			providesTags: ['Profile'],
		}),
		saveProfile: builder.mutation<{ ok: boolean }, ProfileValues>({
			query: (values) => ({
				url: '/profile',
				method: 'PUT',
				body: values,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const { useGetProfileQuery, useSaveProfileMutation } = profileApi;