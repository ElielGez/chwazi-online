import React, { useEffect, useState } from 'react';
import Game from './components/Game';
import { CIRCLE_VH } from './utils/dimensions';
import { IThemeContext } from './entities/Theme';
import { IGameContext } from './entities/Game';
import { v4 } from 'uuid';
import { IClient } from './entities/Cilent';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Online } from './entities/Online';
import { Room } from './entities/Room';
import { copyToClipboard } from './utils/copyclipboard';
import { getGameLink } from './utils/helpers';
import useSystemAlerts from './hooks/useSystemAlerts';

export const ThemeContext = React.createContext({} as IThemeContext);
export const GameContext = React.createContext({} as IGameContext);

function App() {
	const [client, setClient] = useState<IClient>({ id: v4() });
	const [online, setOnline] = useState<Online>();
	const [darkMode, setDarkMode] = useState(true);
	const [searchParams] = useSearchParams();
	const { enqueueSnackbar } = useSnackbar();
	const { showAlerts } = useSystemAlerts(enqueueSnackbar);
	const roomId = searchParams?.get('roomid');
	const isHost = !Boolean(roomId);

	useEffect(() => {
		document.documentElement.style.setProperty('--circle-size', CIRCLE_VH + 'vh');
		showAlerts();
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.remove('dark-theme');
		}
	}, [darkMode]);

	useEffect(() => {
		if (roomId) {
			setTimeout(() => {
				const name = window.prompt('Please enter your name');
				if (name) {
					const newClient = { ...client, name };
					const room = new Room(roomId, newClient);
					const online = new Online(room, false, enqueueSnackbar);
					online?.join(roomId, newClient);
					setOnline(online);
					setClient(newClient);
				}
			}, 0);
		}
	}, []);

	const onIsOnline = (isOnline: boolean, clientName?: string) => {
		if (isOnline) {
			const newClient = { ...client, name: clientName };
			const room = new Room(v4(), newClient);
			setOnline(new Online(room, isHost, enqueueSnackbar));
			const link = `${getGameLink()}?roomid=${room.id}`;
			copyToClipboard(link);
			enqueueSnackbar('Linked copied to clipboard', { variant: 'success' });
			return link;
		} else {
			online?.disconnect();
			setOnline(undefined);
		}
	};

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<GameContext.Provider value={{ isHost, client, setClient, online, onIsOnline }}>
				<Game />
			</GameContext.Provider>
		</ThemeContext.Provider>
	);
}

export default App;
