import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
	BaseQueryApi,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout } from '../slices/user-slice';

export const baseQuery = fetchBaseQuery({
	baseUrl: '/api',
	credentials: 'include',
});

let refreshRequest: Promise<boolean> | null = null;

const refreshSession = async (
	api: BaseQueryApi,
	extraOptions: object,
): Promise<boolean> => {
	if (refreshRequest) return refreshRequest;

	const request = (async () => {
		const result = await baseQuery(
			{ url: '/refresh', method: 'POST' },
			api,
			extraOptions,
		);
		return !result.error;
	})();

	const pending = request.finally(() => {
		refreshRequest = null;
	});
	refreshRequest = pending;

	return pending;
};

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const isRefreshed = await refreshSession(api, extraOptions);

		if (isRefreshed) {
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}

	return result;
};