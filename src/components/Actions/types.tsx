import { FunctionComponent } from 'react';
import { IGame } from '../../entities/Game';
import { updateGameProps } from '../Game/types';

type Props = {
	visible: boolean;
	game: IGame;
	onGameChanged: ({ number }: updateGameProps) => void;
};

export type Type = FunctionComponent<Props>;
