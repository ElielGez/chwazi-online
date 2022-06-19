import { Type } from './types';
import './index.scss';
import FlatIconButton from '../Styled/FlatIconButton';
import { useContext, useState } from 'react';
import { DEFAULT_FINGERS_NUMBER, DEFAULT_GROUPS_NUMBER, gameMode } from '../Game/types';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import NativeSelect from '@mui/material/NativeSelect';
import { ThemeContext } from '../../App';

const Actions: Type = ({ visible, game, setFingersGame, setGroupsGame }) => {
	const theme = useContext(ThemeContext);
	const [gameMode, setGameMode] = useState<gameMode>('fingers');
	const [number, setNumber] = useState(DEFAULT_FINGERS_NUMBER);
	const onSetGameMode = (clicked: gameMode) => {
		if (clicked === gameMode) return;
		else if (gameMode === 'fingers') {
			onGroups(number);
		} else {
			onFingers(number);
		}
	};
	const onGroups = (number: number) => {
		const correctNumber = number < DEFAULT_GROUPS_NUMBER ? DEFAULT_GROUPS_NUMBER : number;
		setGroupsGame({ numberGroups: correctNumber });
		setNumber(correctNumber);
		setGameMode('groups');
	};
	const onFingers = (number: number) => {
		const correctNumber = number < DEFAULT_FINGERS_NUMBER ? DEFAULT_FINGERS_NUMBER : number;
		setFingersGame({ numberFingers: correctNumber });
		setNumber(correctNumber);
		setGameMode('fingers');
	};
	if (!visible) return null;
	return (
		<div className='actions'>
			<FlatIconButton variant='rounded' toggle={gameMode === 'fingers'} onClick={() => onSetGameMode('fingers')}>
				<PersonIcon />
			</FlatIconButton>
			<FlatIconButton variant='rounded' toggle={gameMode === 'groups'} onClick={() => onSetGameMode('groups')}>
				<GroupsIcon />
			</FlatIconButton>
			<FlatIconButton variant='rounded' className='select-borderless-container'>
				<NativeSelect
					className='select-borderless'
					variant='standard'
					value={number}
					onChange={e => {
						if (!e?.target?.value) return;
						const number = parseInt(e?.target?.value);
						setNumber(number);
						if (gameMode === 'fingers') onFingers(number);
						else onGroups(number);
					}}>
					{new Array(20).fill('').map((item, index) => {
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
			<FlatIconButton variant='rounded'>
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
