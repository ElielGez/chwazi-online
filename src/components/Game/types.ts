import { gameMode } from '../../entities/Game';

export const DEFAULT_FINGERS_NUMBER = 1;
export const DEFAULT_GROUPS_NUMBER = 2;
export type updateGameProps = { mode?: gameMode; number?: number };
