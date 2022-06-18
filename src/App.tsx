import React, { useEffect } from 'react';
import Game from './components/Game';
import { CIRCLE_VH } from './utils/dimensions';

function App() {
	useEffect(() => {
		document.documentElement.style.setProperty('--circle-size', CIRCLE_VH + 'vh');
	}, []);
	return <Game />;
}

export default App;
