import React from 'react';
import Actions from '../Actions';
import Circle from '../Circle';
import './index.scss';
import { IGameContext } from './types';
import useGame from './useGame';

const context: IGameContext = {
	circles: [],
};
export const GameContext = React.createContext(context);

const Game = () => {
	const { game, setFingersGame, setGroupsGame, circles, onPointerDown, onPointerUp, onPointerMove } = useGame();
	return (
		<GameContext.Provider value={{ game, circles }}>
			<Actions visible={Boolean(!circles.length)} game={game} setFingersGame={setFingersGame} setGroupsGame={setGroupsGame} />
			<div className='game-container' onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerMove={onPointerMove}>
				{circles.map(circle => (
					<Circle key={circle.id} id={circle.id} color={circle.color} top={circle.top} left={circle.left} />
				))}
			</div>
		</GameContext.Provider>
	);
};

export default Game;
