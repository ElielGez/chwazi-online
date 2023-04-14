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
			setCircles(winners);
		},
		[online],
	);
	const fingersGame = useMemo(() => {
		return new FingersGame(false, DEFAULT_FINGERS_NUMBER, onWinners);
	}, []);
	const groupsGame = useMemo(() => {
		return new GroupsGame(false, DEFAULT_GROUPS_NUMBER, onWinners);
	}, []);
	const [game, setGame] = useState<IGame>(fingersGame);

	useEffect(() => {
		if (online && !isHost) {
			online.socket.on('game-changed', ({ mode, number }: updateGameProps) => {
				onGameChanged({ mode, number });
			});
		}
	}, [online, isHost]);

	useEffect(() => {
		game.setOnWinners(onWinners);
	}, [onWinners]);

	useEffect(() => {
		if (online) {
			online.socket.on('pointer-down', (circles: ICircleType[]) => {
				setCircles(calculateOrigDevicePositions(circles));
			});
			online.socket.on('pointer-up', (circles: ICircleType[]) => {
				setCircles(calculateOrigDevicePositions(circles));
			});
			online.socket.on('pointer-move', (circles: ICircleType[]) => {
				// setCircles(calculateOrigDevicePositions(circles)); // for now disable online movements due to a lot of events that coming from websocket
			});
			online.socket.on('winners', (circles: ICircleType[]) => {
				setCircles(calculateOrigDevicePositions(circles));
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
		const newCircles = setOrigDeviceDimensions(game.onFingerDown(e, circles));
		if (newCircles) {
			if (online) online.emitPointerDown(newCircles);
			setCircles(newCircles);
		}
	};
	const onPointerUp: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = setOrigDeviceDimensions(game.onFingerUp(e, circles));
		if (newCircles) {
			if (online) online.emitPointerUp(newCircles);
			setCircles(newCircles);
		}
	};
	const onPointerMove: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = setOrigDeviceDimensions(game.onFingerMove(e, circles));
		if (newCircles?.length) {
			if (online) online.emitPointerMove(newCircles);
		}
	};
	const setOrigDeviceDimensions = (circles?: ICircleType[]) => {
		const newCircles =
			circles?.map(circle => {
				return { ...circle, origDeviceWidth: window.innerWidth, origDeviceHeight: window.innerHeight };
			}) || [];
		return newCircles;
	};
	const calculateOrigDevicePositions = (circles?: ICircleType[]) => {
		const newCircles =
			circles?.map(circle => {
				const { left, top } = crossDeviceCalcPosition(circle);
				return { ...circle, left, top };
			}) || [];
		return newCircles;
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
