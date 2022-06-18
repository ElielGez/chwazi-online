import { Type } from './types';
import './index.scss';
import CircleSvg from '../../assets/CircleSvg';

const Circle: Type = ({ color, top, left, id }) => {
	return <CircleSvg id={id} className='circle-container' style={{ top, left }} color={color} />;
};

export default Circle;
