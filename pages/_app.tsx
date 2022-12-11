import { ToastProvider } from '@nature-ui/core';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Component {...pageProps} />
		</ToastProvider>
	);
}
