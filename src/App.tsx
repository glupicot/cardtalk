import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './components/body/body';
import { HomePage } from './pages/home-page/home-page';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Body>
					<HomePage />
				</Body>
				<Footer contacts={{ email: 'mail@cardtalk.ru', phone: '+7 999 123-45-67' }} />
			</BrowserRouter>
		</Provider>
	);
}