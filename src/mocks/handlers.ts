import { http, HttpResponse } from 'msw';
import { ADMIN_LOGIN, ADMIN_PASSWORD } from './data/auth';
import { PROFILE_FIELDS } from './data/profile';
import { WORDS } from './data/words';
import type { ProfileValues } from '../types';

const ACCESS_COOKIE = 'access_token';
const PROFILE_STORAGE_KEY = 'mock_profile';

const defaultProfileValues = (): ProfileValues =>
	Object.fromEntries(PROFILE_FIELDS.map((f) => [f.name, f.value]));

const getStoredProfile = (): ProfileValues => {
	const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
	if (!raw) return defaultProfileValues();
	try {
		return JSON.parse(raw) as ProfileValues;
	} catch {
		return defaultProfileValues();
	}
};

const readCookie = (name: string): string | null => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? match[2] : null;
};

export const handlers = [
	http.post('/api/authorization', async ({ request }) => {
		const body = (await request.json()) as { login: string; password: string };
		if (body.login === ADMIN_LOGIN && body.password === ADMIN_PASSWORD) {
			document.cookie = `${ACCESS_COOKIE}=access; path=/`;
			return HttpResponse.json({ name: 'Admin' });
		}
		return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
	}),

	http.post('/api/refresh', () => {
		if (readCookie(ACCESS_COOKIE) !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		return HttpResponse.json({});
	}),

	http.post('/api/logout', () => {
		document.cookie = `${ACCESS_COOKIE}=; path=/; max-age=0`;
		return HttpResponse.json({});
	}),

	http.get('/api/me', () => {
		if (readCookie(ACCESS_COOKIE) !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		return HttpResponse.json({ name: 'Admin' });
	}),

	http.get('/api/profile', () => {
		if (readCookie(ACCESS_COOKIE) !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		return HttpResponse.json(getStoredProfile());
	}),

	http.put('/api/profile', async ({ request }) => {
		if (readCookie(ACCESS_COOKIE) !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		const body = (await request.json()) as ProfileValues;
		localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(body));
		return HttpResponse.json({ ok: true });
	}),

	http.get('/api/words', () => {
		if (readCookie(ACCESS_COOKIE) !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		return HttpResponse.json(WORDS);
	}),
];