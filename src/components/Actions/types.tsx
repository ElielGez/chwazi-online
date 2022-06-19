import { FunctionComponent } from 'react';
import { IGame } from '../Game/types';

type Props = {
	visible: boolean;
	game: IGame;
	setFingersGame: ({ isOnline, numberFingers }: { isOnline?: boolean; numberFingers?: number }) => void;
	setGroupsGame: ({ isOnline, numberGroups }: { isOnline?: boolean; numberGroups?: number }) => void;
};

export type Type = FunctionComponent<Props>;
