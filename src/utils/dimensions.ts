export const CIRCLE_VH = 15;

export const calcVhToPx = (vh: number): number => {
	const height = window.innerHeight || document.documentElement.clientHeight;
	return (vh * height) / 100;
};
