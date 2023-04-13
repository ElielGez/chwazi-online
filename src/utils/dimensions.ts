import { ICircleType } from '../entities/Circle';

export const CIRCLE_VH = 16;

export const calcVhToPx = (vh: number): number => {
	const height = window.innerHeight || document.documentElement.clientHeight;
	return (vh * height) / 100;
};

export const crossDeviceCalcPosition = (circle: ICircleType) => {
	let pageX = circle.left;
	let pageY = circle.top;
	if (pageX > window.innerWidth && circle.origDeviceWidth) pageX = pageX - (pageX - window.innerWidth) - (circle.origDeviceWidth - pageX);
	if (pageY > window.innerHeight && circle.origDeviceHeight) pageY = pageY - (pageY - window.innerHeight) - (circle.origDeviceHeight - pageY);
	return {
		left: pageX,
		top: pageY,
	};
};
