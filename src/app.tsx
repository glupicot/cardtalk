import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { CardsPage } from './pages/cards-page';
import { ProfilePage } from './pages/profile-page';
import { ROUTES } from './constants/routes';

const AppContent = () => {
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