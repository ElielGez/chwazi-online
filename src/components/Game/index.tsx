import React from 'react';
import Actions from '../Actions';
import Circle from '../Circle';
import './index.scss';
import useGame from './useGame';

const Game = () => {
	const { game, onGameChanged, circles, onPointerDown, onPointerUp, onPointerMove } = useGame();
	return (
		<>
			<Actions visible={Boolean(!circles.length)} game={game} onGameChanged={onGameChanged} />
			<div className='game-container' onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerMove={onPointerMove}>
				{circles.map(circle => (
					<Circle key={circle.id} id={circle.id} color={circle.color} top={circle.top} left={circle.left} />
				))}
			</div>
		</>
	);
};

export default Game;
