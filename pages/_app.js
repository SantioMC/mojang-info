import { NextUIProvider, createTheme } from '@nextui-org/react';
import '../styles/globals.css';

const theme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			// brand colors
			background: '#1d1d1d',
			text: '#ddd',
			gray700: '#999',
			selection: '#abe0ff52'
		}
	}
});

function MyApp({ Component, pageProps }) {
	return (
		<NextUIProvider theme={theme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}

export default MyApp;
