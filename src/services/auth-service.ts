import { ADMIN_LOGIN, ADMIN_PASSWORD } from '../constants/auth';

export const authService = {
	login(login: string, password: string): Promise<boolean> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(login === ADMIN_LOGIN && password === ADMIN_PASSWORD);
			}, 500);
		});
	},
};