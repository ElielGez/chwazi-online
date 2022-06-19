import { colorBrightness } from '../utils/colors';

const CircleSvg = (props: any) => {
	const { color = '#08032c', ...rest } = props;
	const brightColor = colorBrightness(color, 10);
	const viewBoxSize = 120;
	const circleSize = viewBoxSize / 2;
	return (
		<svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} xmlns='http://www.w3.org/2000/svg' {...rest}>
			<circle className='outer c3' fill={brightColor} cx={circleSize} cy={circleSize} r={circleSize} />
			<circle className='outer c2' fill={brightColor} cx={circleSize} cy={circleSize} r='50' />
			<circle className='outer c1' fill={brightColor} cx={circleSize} cy={circleSize} r='40' />
			<circle className='inner' fill={color} stroke={color} strokeWidth='6px' cx={circleSize} cy={circleSize} r='30' />
			{/* <text x='50%' y='50%' text-anchor='middle' fontSize={9}>
				{rest.id} // for testing
			</text> */}
		</svg>
	);
};
export default CircleSvg;
