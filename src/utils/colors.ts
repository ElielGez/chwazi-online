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
export const getRandomColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
