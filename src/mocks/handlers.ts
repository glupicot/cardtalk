import { http, HttpResponse } from 'msw';
import { ADMIN_LOGIN, ADMIN_PASSWORD } from '../constants/auth';
import { PROFILE_FIELDS } from '../constants/profile';

const ACCESS_COOKIE = 'access_token';

export const handlers = [
	http.post('/api/authorization', async ({ request }) => {
		const body = (await request.json()) as { login: string; password: string };
		if (body.login === ADMIN_LOGIN && body.password === ADMIN_PASSWORD) {
			return HttpResponse.json(
				{ name: 'Admin' },
				{
					status: 200,
					headers: {
						'Set-Cookie': `${ACCESS_COOKIE}=access; Path=/; HttpOnly; SameSite=Lax`,
					},
				}
			);
		}
		return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
	}),

	http.post('/api/refresh', () => {
		return HttpResponse.json(
			{},
			{
				status: 200,
				headers: {
					'Set-Cookie': `${ACCESS_COOKIE}=access; Path=/; HttpOnly; SameSite=Lax`,
				},
			}
		);
	}),

	http.post('/api/logout', () => {
		return HttpResponse.json(
			{},
			{
				status: 200,
				headers: {
					'Set-Cookie': `${ACCESS_COOKIE}=; Path=/; Max-Age=0`,
				},
			}
		);
	}),

	http.get('/api/me', ({ cookies }) => {
		if (cookies[ACCESS_COOKIE] === 'access') {
			return HttpResponse.json({ name: 'Admin' });
		}
		return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}),

	http.get('/api/profile', ({ cookies }) => {
		if (cookies[ACCESS_COOKIE] !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		return HttpResponse.json(PROFILE_FIELDS);
	}),

	http.put('/api/profile', async ({ request, cookies }) => {
		if (cookies[ACCESS_COOKIE] !== 'access') {
			return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		const body = (await request.json()) as { fields: unknown };
		console.log('Сохранение профиля:', body);
		return HttpResponse.json({ ok: true });
	}),
];