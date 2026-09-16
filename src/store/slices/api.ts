import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth } from './base-query';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Profile', 'Words'],
	endpoints: () => ({}),
});

export const publicApi = createApi({
	reducerPath: 'publicApi',
	baseQuery,
	tagTypes: [],
	endpoints: () => ({}),
});