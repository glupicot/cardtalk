import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import HomePage from './pages/home-page/home-page';
import LoginPage from './pages/login-page/login-page';
import CardsPage from './pages/cards-page/cards-page';
import { ProfilePage } from './pages/profile-page/profile-page';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header
					links={[
						{ to: '/cards', label: 'Карточки' },
						{ to: '/login', label: 'Войти' },
					]}
				/>
				<Body>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/cards" element={<CardsPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
				</Body>
				<Footer contacts={{ email: 'mail@cardtalk.ru', phone: '+7 999 123-45-67' }} />
			</BrowserRouter>
		</Provider>
	);
}