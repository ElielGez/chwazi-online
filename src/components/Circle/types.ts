import { FunctionComponent } from 'react';
export type ICircleType = {
	id: number;
	color: string;
	left: string;
	top: string;
	name?: string;
};

type Props = ICircleType & {};

export type Type = FunctionComponent<Props>;
