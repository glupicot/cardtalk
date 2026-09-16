import { api } from './api';
import type { Word } from '../../types';

export const wordsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWords: builder.query<Word[], void>({
			query: () => '/words',
			providesTags: ['Words'],
		}),
	}),
});

export const { useGetWordsQuery } = wordsApi;