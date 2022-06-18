import { colorBrightness } from '../utils/colors';

const CircleSvg = (props: any) => {
	const { color = '#08032c', ...rest } = props;
	return (
		<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' width='70px' height='70px' {...rest}>
			<circle
				className='outer'
				fill='transparent'
				strokeWidth='8px'
				stroke={colorBrightness(color, 30)}
				strokeDashoffset='276.460'
				strokeDasharray='276.460 276.460'
				cx='50'
				cy='50'
				r='44'
			/>
			<circle className='inner' fill={color} stroke={color} strokeWidth='6px' cx='50' cy='50' r='30' />
			{/* <text x='50%' y='50%' text-anchor='middle' fontSize={9}>
				{rest.id} // for testing
			</text> */}
		</svg>
	);
};
export default CircleSvg;
