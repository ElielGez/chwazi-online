const hexByteAdjust = (value: string, amount: number) => {
	let hexByte = parseInt(value, 16) + amount;
	if (hexByte < 0) hexByte = 0;
	if (hexByte > 255) hexByte = 255;
	let hexByteString = hexByte.toString(16);
	if (hexByteString.length < 2) hexByteString = '0' + hexByteString;
	return hexByteString;
};
export const colorBrightness = (color: string, amount: number) => {
	const rr = hexByteAdjust(color.substring(1, 3), amount);
	const gg = hexByteAdjust(color.substring(3, 5), amount);
	const bb = hexByteAdjust(color.substring(5, 7), amount);
	return '#' + rr + gg + bb;
};
const _getRandomColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
export const getRandomColor = (existsColors?: Array<string>): string => {
	if (!existsColors?.length) return _getRandomColor();
	else {
		const colorsRgb = existsColors.map(hexToRgb);
		const newColor = _getRandomColor();
		const newColorRgb = hexToRgb(newColor);
		const similar = colorsRgb.some(color => isSimilar(color, newColorRgb));
		if (similar) return getRandomColor(existsColors);
		else return newColor;
	}
};
const hexToRgb = (hex: string) => {
	const color = parseInt(hex.substring(1), 16);
	const r = color >> 16;
	const g = (color - (r << 16)) >> 8;
	const b = color - (r << 16) - (g << 8);
	return [r, g, b];
};
const isSimilar = ([r1, g1, b1]: Array<number>, [r2, g2, b2]: Array<number>) => {
	return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 80;
};
