import React, { useEffect, useState } from 'react';
import Game from './components/Game';
import { CIRCLE_VH } from './utils/dimensions';

interface IThemeContext {
	darkMode?: boolean;
	setDarkMode?: (darkMode: boolean) => void;
}
export const ThemeContext = React.createContext({} as IThemeContext);
function App() {
	const [darkMode, setDarkMode] = useState(true);
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.remove('dark-theme');
		}
	}, [darkMode]);
	useEffect(() => {
		document.documentElement.style.setProperty('--circle-size', CIRCLE_VH + 'vh');
	}, []);
	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<Game />
		</ThemeContext.Provider>
	);
}

export default App;
