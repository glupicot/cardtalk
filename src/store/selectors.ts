import type { RootState } from './index';

export const selectLogin = (s: RootState) => s.user.login;