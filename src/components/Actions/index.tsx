import { Type } from './types';
import './index.scss';
import FlatIconButton from '../Styled/FlatIconButton';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import NativeSelect from '@mui/material/NativeSelect';
import { gameMode } from '../../entities/Game';
import useActions from './useActions';

const Actions: Type = ({ visible, game, onGameChanged }) => {
	const { theme, isHost, isOnline, onIsOnline } = useActions();
	const gameMode = game.mode;
	const number = game.number;
	const disabled = !isHost && isOnline;

	const onSetGameMode = (clicked: gameMode) => {
		if (clicked === gameMode) return;
		onGameChanged({ mode: clicked });
	};
	if (!visible) return null;
	return (
		<div className='actions'>
			<FlatIconButton variant='rounded' toggle={gameMode === 'fingers'} onClick={() => onSetGameMode('fingers')} disabled={disabled}>
				<PersonIcon />
			</FlatIconButton>
			<FlatIconButton variant='rounded' toggle={gameMode === 'groups'} onClick={() => onSetGameMode('groups')} disabled={disabled}>
				<GroupsIcon />
			</FlatIconButton>
			<FlatIconButton variant='rounded' className='select-borderless-container' disabled={disabled}>
				<NativeSelect
					className='select-borderless'
					variant='standard'
					value={number}
					onChange={e => {
						if (!e?.target?.value) return;
						const number = parseInt(e?.target?.value);
						onGameChanged({ number });
					}}
					disabled={disabled}>
					{new Array(10).fill('').map((item, index) => {
						const value = index + 1;
						return (
							<option key={value} value={value}>
								{value} {gameMode === 'fingers' ? 'Fingers' : 'Groups'}
							</option>
						);
					})}
				</NativeSelect>
				<input value={number} readOnly />
			</FlatIconButton>
			<FlatIconButton
				variant='rounded'
				toggle={isOnline}
				onClick={() => {
					if (!isOnline) {
						const name = window.prompt('Enter your name');
						if (name) {
							const link = onIsOnline(!isOnline, name);
							console.log('index : link', link);
						}
					} else onIsOnline(!isOnline);
				}}>
				<LanguageIcon />
			</FlatIconButton>
			<FlatIconButton
				variant='rounded'
				toggle={theme.darkMode}
				onClick={() => {
					if (theme.setDarkMode) theme.setDarkMode(!theme.darkMode);
				}}>
				<LightModeIcon />
			</FlatIconButton>
		</div>
	);
};

export default Actions;
