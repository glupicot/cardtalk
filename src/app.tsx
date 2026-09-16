import { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { setUser, logout } from './store/slices/user-slice';
import { useGetMeQuery } from './store/slices/auth-api';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import { HomePage, LoginPage, CardsPage, ProfilePage } from './pages';
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
			<Header />
			<Body>
				<Suspense fallback={<div>Загружаемся, уже скоро, ну почти...</div>}>
					<Routes>
						<Route path={ROUTES.HOME} element={<HomePage />} />
						<Route path={ROUTES.LOGIN} element={<LoginPage />} />
						<Route path={ROUTES.CARDS} element={<CardsPage />} />
						<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
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