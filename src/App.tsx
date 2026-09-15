import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Body } from './components/body/body'
import { ProtectedRoute } from './components/protected-route/protected-route'
import HomePage from './pages/home-page/home-page'
import LoginPage from './pages/login-page/login-page'
import CardsPage from './pages/cards-page/cards-page'
import { ProfilePage } from './pages/profile-page/profile-page'
import { ROUTES } from './constants/routes'

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header
					links={[
						{ to: ROUTES.CARDS, label: 'Карточки' },
						{ to: ROUTES.LOGIN, label: 'Войти' },
					]}
				/>
				<Body>
					<Routes>
						<Route path={ROUTES.HOME} element={<HomePage />} />
						<Route path={ROUTES.LOGIN} element={<LoginPage />} />

						<Route element={<ProtectedRoute />}>
							<Route path={ROUTES.CARDS} element={<CardsPage />} />
							<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
						</Route>
					</Routes>
				</Body>
				<Footer contacts={{ email: 'mail@cardtalk.ru', phone: '+7 999 123-45-67' }} />
			</BrowserRouter>
		</Provider>
	)
}