import { PointerEvent } from 'react';
import { getRandomColor } from '../utils/colors';
import { calcVhToPx, CIRCLE_VH, crossDeviceCalcPosition } from '../utils/dimensions';
import { randomGroups, randomSingle } from '../utils/randomizeAlgo';
import { IClient } from './Cilent';
import { ICircleType } from './Circle';
import { Online } from './Online';

type IStopGameFunc = () => void;
type IRestartGameFunc = (winnerLogicFunc: () => void) => void;
export type gameMode = 'fingers' | 'groups';
export interface IGame {
	isOnline: boolean;
	mode: gameMode;
	number: number;
	timeoutIntervals: NodeJS.Timeout[];
	onWinners?: (winners: ICircleType[]) => void;
	restartGame: IRestartGameFunc;
	stopGame: IStopGameFunc;
	setIsOnline: (isOnline: boolean) => void;
	setNumber: (number: number) => void;

	onFingerDown: (e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[], color?: string) => ICircleType[] | undefined;
	onFingerUp: (e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]) => ICircleType[] | undefined;
	onFingerMove: (e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]) => ICircleType[] | undefined;
	winnerLogicFunc?: (circles: ICircleType[]) => void;
}
export class Game implements IGame {
	isOnline: boolean;
	mode: gameMode;
	number: number;
	timeoutIntervals: NodeJS.Timeout[] = [];
	constructor(isOnline: boolean, mode: gameMode, number: number) {
		this.isOnline = isOnline;
		this.mode = mode;
		this.number = number;
	}
	onWinners?: (winners: ICircleType[]) => void;
	setIsOnline = (isOnline: boolean) => {
		this.isOnline = isOnline;
	};
	setNumber = (number: number) => {
		this.number = number;
	};
	restartGame: IRestartGameFunc = winnerLogicFunc => {
		this.timeoutIntervals.push(
			setTimeout(() => {
				winnerLogicFunc();
			}, 3000),
		);
	};
	stopGame: IStopGameFunc = () => {
		const cleanIntervals: NodeJS.Timeout[] = [];
		this.timeoutIntervals.forEach(timeoutFunc => {
			cleanIntervals.push(timeoutFunc);
			clearTimeout(timeoutFunc);
		});
		this.timeoutIntervals = this.timeoutIntervals.filter(id => !cleanIntervals.includes(id));
	};

	onFingerDown(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[], _color?: string) {
		if (!e) return;
		const color = _color || getRandomColor(circles.map(circle => circle.color));
		const newCircles = [...circles];
		const positions = this.calcPositions(e.pageX, e.pageY);
		newCircles.push({
			id: e.pointerId,
			color,
			left: positions.pageX,
			top: positions.pageY,
		});

		return newCircles;
	}

	onFingerUp(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]) {
		if (!e) return;

		const newCircles = [...circles].filter(circle => circle.id !== e.pointerId);

		return newCircles;
	}
	onFingerMove(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]) {
		if (!e) return;

		const circle = document.getElementById('' + e.pointerId);
		if (circle === null) return;
		const positions = this.calcPositions(e.pageX, e.pageY);
		circle.style.left = positions.pageX + 'px';
		circle.style.top = positions.pageY + 'px';

		const newCircles = [...circles].map(circle => {
			if (circle.id === e.pointerId) {
				const newCircle = { ...circle, left: positions.pageX, top: positions.pageY };
				const { left, top } = crossDeviceCalcPosition(newCircle);
				return { ...newCircle, left, top };
			} else return circle;
		});
		return newCircles;
	}
	calcPositions(x: number, y: number) {
		return {
			pageX: x - calcVhToPx(CIRCLE_VH) / 2,
			pageY: y - calcVhToPx(CIRCLE_VH) / 2,
		};
	}
}
export class FingersGame extends Game {
	constructor(isOnline: boolean, numberFingers: number, onWinners?: (winners: ICircleType[]) => void) {
		super(isOnline, 'fingers', numberFingers);
		this.onWinners = onWinners;
	}

	onFingerDown(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]): ICircleType[] | undefined {
		this.stopGame();
		const newCircles = super.onFingerDown(e, circles);
		if (!newCircles) return;

		if (newCircles.length > this.number) if (this.restartGame) this.restartGame(this.winnerLogicFunc.bind(this, newCircles));
		return newCircles;
	}
	onFingerUp(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]): ICircleType[] | undefined {
		const newCircles = super.onFingerUp(e, circles);
		if (!newCircles) return;

		if (newCircles.length <= this.number) this.stopGame();
		return newCircles;
	}
	winnerLogicFunc(circles: ICircleType[]) {
		const winners = randomSingle(circles, this.number) as ICircleType[];
		if (this.onWinners) this.onWinners(winners);
	}
}

export class GroupsGame extends Game {
	constructor(isOnline: boolean, numberGroups: number, onWinners?: (winners: ICircleType[]) => void) {
		super(isOnline, 'groups', numberGroups);
		this.onWinners = onWinners;
	}
	onFingerDown(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]): ICircleType[] | undefined {
		this.stopGame();
		const newCircles = super.onFingerDown(e, circles, '#d4d4d4');
		if (!newCircles) return;

		if (newCircles.length > this.number) if (this.restartGame) this.restartGame(this.winnerLogicFunc.bind(this, newCircles));
		return newCircles;
	}
	onFingerUp(e: PointerEvent<HTMLDivElement> | undefined, circles: ICircleType[]): ICircleType[] | undefined {
		const newCircles = super.onFingerUp(e, circles);
		if (!newCircles) return;

		if (newCircles.length <= this.number) this.stopGame();
		return newCircles;
	}
	winnerLogicFunc(circles: ICircleType[]) {
		const matrix = randomGroups(circles, this.number);
		const winners = matrix.flatMap((circles: ICircleType[]) => {
			const color = getRandomColor();
			return circles.map(circle => ({ ...circle, color }));
		});
		if (this.onWinners) this.onWinners(winners);
	}
}

export interface IGameContext {
	isHost: boolean;
	online?: Online;
	onIsOnline: (isOnline: boolean, clientName?: string) => string | undefined;
	client: IClient;
	setClient?: (client: IClient) => void;
}
