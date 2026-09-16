import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { setUser, logout } from './store/slices/user-slice';
import { useGetMeQuery } from './api/auth-api';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import HomePage from './pages/home-page/home-page';
import LoginPage from './pages/login-page/login-page';
import CardsPage from './pages/cards-page/cards-page';
import ProfilePage from './pages/profile-page/profile-page';
import { ROUTES } from './constants/routes';

const AppContent = () => {
	const dispatch = useAppDispatch();
	const { data, isError, isSuccess } = useGetMeQuery();

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setUser(data.name));
		}
		if (isError) {
			dispatch(logout());
		}
	}, [isSuccess, isError, data, dispatch]);

	return (
		<>
			<Header
				tabs={[
					{ id: 'cards', label: 'Карточки', to: ROUTES.CARDS },
					{ id: 'profile', label: 'Профиль', to: ROUTES.PROFILE },
				]}
			/>
			<Body>
				<Routes>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.CARDS} element={<CardsPage />} />
					<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
				</Routes>
			</Body>
			<Footer contacts={{ email: 'mail@cardtalk.ru', phone: '+7 999 123-45-67' }} />
		</>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</Provider>
	);
}
