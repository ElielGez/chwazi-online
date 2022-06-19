import { PointerEventHandler, useMemo, useState } from 'react';
import { ICircleType } from '../Circle/types';
import { FingersGame, GroupsGame, IGame, DEFAULT_FINGERS_NUMBER, DEFAULT_GROUPS_NUMBER } from './types';

const useGame = () => {
	const [circles, setCircles] = useState<ICircleType[]>([]);
	const onWinners = (winners: ICircleType[]) => {
		setCircles(winners);
	};
	const fingersGame = useMemo(() => {
		return new FingersGame(false, DEFAULT_FINGERS_NUMBER, onWinners);
	}, []);
	const groupsGame = useMemo(() => {
		return new GroupsGame(false, DEFAULT_GROUPS_NUMBER, onWinners);
	}, []);
	const [game, setGame] = useState<IGame>(fingersGame);

	const setGroupsGame = ({ isOnline, numberGroups }: { isOnline?: boolean; numberGroups?: number }) => {
		const newGame = groupsGame; // TODO: check if its not a problem
		if (isOnline) newGame.isOnline = isOnline;
		if (numberGroups) newGame.number = numberGroups;
		setGame(newGame);
	};
	const setFingersGame = ({ isOnline, numberFingers }: { isOnline?: boolean; numberFingers?: number }) => {
		const newGame = fingersGame; // TODO: check if its not a problem
		if (isOnline) newGame.isOnline = isOnline;
		if (numberFingers) newGame.number = numberFingers;
		setGame(newGame);
	};
	const onPointerDown: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = game.onFingerDown(e, circles);
		if (newCircles) setCircles(newCircles);
	};
	const onPointerUp: PointerEventHandler<HTMLDivElement> | undefined = e => {
		const newCircles = game.onFingerUp(e, circles);
		if (newCircles) setCircles(newCircles);
	};
	const onPointerMove: PointerEventHandler<HTMLDivElement> | undefined = e => {
		game.onFingerMove(e);
	};
	return {
		game,
		setFingersGame,
		setGroupsGame,
		circles,
		onPointerDown,
		onPointerUp,
		onPointerMove,
	};
};

export default useGame;
