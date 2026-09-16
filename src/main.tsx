import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './app';

async function enableMocking() {
	const { worker } = await import('./mocks/browser');
	return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});