import { lazy } from 'react';

export const HomePage = lazy(() => import('./home-page/home-page'));
export const LoginPage = lazy(() => import('./login-page/login-page'));
export const CardsPage = lazy(() => import('./cards-page/cards-page'));
export const ProfilePage = lazy(() => import('./profile-page/profile-page'));