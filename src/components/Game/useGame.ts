import { PointerEventHandler, useMemo, useState, useContext, useEffect, useCallback } from 'react';
import { GameContext } from '../../App';
import { ICircleType } from '../../entities/Circle';
import { FingersGame, GroupsGame, IGame } from '../../entities/Game';
import { DEFAULT_FINGERS_NUMBER, DEFAULT_GROUPS_NUMBER, updateGameProps } from './types';
import { crossDeviceCalcPosition } from '../../utils/dimensions';

const useGame = () => {
	const { online, isHost } = useContext(GameContext);
	const [circles, setCircles] = useState<ICircleType[]>([]);

	const onWinners = useCallback(
		(winners: ICircleType[]) => {
			if (online) online.emitWinners(winners);
			onSetCircles(winners);
		},
		[online],
	);
	const fingersGame = useMemo(() => {
		return new FingersGame(false, DEFAULT_FINGERS_NUMBER, onWinners);
	}, [onWinners]);
	const groupsGame = useMemo(() => {
		return new GroupsGame(false, DEFAULT_GROUPS_NUMBER, onWinners);
	}, [onWinners]);
	const [game, setGame] = useState<IGame>(fingersGame);

	useEffect(() => {
		if (online && !isHost) {
			online.socket.on('game-changed', ({ mode, number }: updateGameProps) => {
				onGameChanged({ mode, number });
			});
		}
	}, [online, isHost]);
	useEffect(() => {
		if (online) {
			online.socket.on('pointer-down', (circles: ICircleType[]) => {
				onSetCircles(circles);
			});
			online.socket.on('pointer-up', (circles: ICircleType[]) => {
				onSetCircles(circles);
			});
			online.socket.on('pointer-move', (circles: ICircleType[]) => {
				onSetCircles(circles);
			});
			online.socket.on('winners', (circles: ICircleType[]) => {
				onSetCircles(circles);
			});
		}
	}, [online]);
	const onGameChanged = ({ mode = game.mode, number = game.number }: updateGameProps) => {
		if (mode === 'groups') {
			const newGame = Object.assign(Object.create(GroupsGame.prototype), groupsGame);
			if (number) {
				const correctNumber = number < DEFAULT_GROUPS_NUMBER ? DEFAULT_GROUPS_NUMBER : number;
				newGame.number = correctNumber;
			}
			setGame(newGame);
		} else {
			const newGame = Object.assign(Object.create(FingersGame.prototype), fingersGame);
			if (number) {
				const correctNumber = number < DEFAULT_FINGERS_NUMBER ? DEFAULT_FINGERS_NUMBER : number;
				newGame.number = correctNumber;
			}
			setGame(newGame);
		}
		if (online && isHost) online.emitGameChanged({ mode, number });
	};
	const onPointerDown: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = game.onFingerDown(e, circles);
		if (newCircles) {
			if (online) online.emitPointerDown(newCircles);
			onSetCircles(newCircles);
		}
	};
	const onPointerUp: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = game.onFingerUp(e, circles);
		if (newCircles) {
			if (online) online.emitPointerUp(newCircles);
			onSetCircles(newCircles);
		}
	};
	const onPointerMove: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = game.onFingerMove(e, circles);
		if (newCircles) {
			if (online) online.emitPointerMove(newCircles);
		}
	};
	const onSetCircles = (circles: ICircleType[]) => {
		const newCircles = circles.map(circle => {
			const { left, top } = crossDeviceCalcPosition(circle);
			return { ...circle, left, top, origDeviceWidth: window.innerWidth, origDeviceHeight: window.innerHeight };
		});
		setCircles(newCircles);
	};

	return {
		game,
		onGameChanged,
		circles,
		onPointerDown,
		onPointerUp,
		onPointerMove,
	};
};

export default useGame;
