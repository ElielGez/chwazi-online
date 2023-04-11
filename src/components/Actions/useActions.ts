import { useContext } from 'react';
import { GameContext, ThemeContext } from '../../App';
const useActions = () => {
	const { online, onIsOnline, isHost } = useContext(GameContext);
	const theme = useContext(ThemeContext);
	return {
		theme,
		isHost,
		isOnline: Boolean(online),
		onIsOnline,
	};
};

export default useActions;
