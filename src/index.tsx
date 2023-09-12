import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<SnackbarProvider maxSnack={3}>
			<iframe
				style={{ width: '100%', height: '100%' }}
				allow='geolocation;camera;'
				id='iframe'
				name='iframe'
				src='https://secure-me.au10tixservicesstaging.com/?token=Dlydoh7KxSvga6kWQBH5&api=aHR0cHM6Ly93ZXUtYXBpLmF1MTB0aXhzZXJ2aWNlc3N0YWdpbmcuY29tL3NlY3VyZS1tZS92Mg%3D%3D&locale=en-us&themeName=light&bcd=%231f1d2a&bcl=%23ffffff&pc=%23040024'></iframe>
			{/* <App /> */}
		</SnackbarProvider>
	</BrowserRouter>,
);
