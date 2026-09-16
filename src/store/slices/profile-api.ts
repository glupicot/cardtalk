import { api } from './api';
import type { ProfileField } from '../../types';

export const profileApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<ProfileField[], void>({
			query: () => '/profile',
			providesTags: ['Profile'],
		}),
		saveProfile: builder.mutation<{ ok: boolean }, ProfileField[]>({
			query: (fields) => ({
				url: '/profile',
				method: 'PUT',
				body: { fields },
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const { useGetProfileQuery, useSaveProfileMutation } = profileApi;