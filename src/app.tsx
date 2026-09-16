import { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/slices/user-slice';
import { useGetMeQuery } from './store/slices/auth-api';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { CardsPage } from './pages/cards-page';
import { ProfilePage } from './pages/profile-page';
import { NotFoundPage } from './pages/not-found-page';
import { ROUTES } from './constants/routes';

const AppContent = () => {
	const dispatch = useAppDispatch();
	const { data, isSuccess, isLoading } = useGetMeQuery();

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setUser(data.name));
		}
	}, [isSuccess, data, dispatch]);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<>
			<Header />
			<Body>
				<Suspense fallback={<div>Загружаемся, уже скоро, ну почти...</div>}>
					<Routes>
						<Route path={ROUTES.HOME} element={<HomePage />} />
						<Route path={ROUTES.LOGIN} element={<LoginPage />} />
						<Route path={ROUTES.CARDS} element={<CardsPage />} />
						<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</Body>
			<Footer />
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