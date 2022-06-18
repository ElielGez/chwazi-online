import { Type } from './types';
import './index.scss';
import FlatIconButton from '../Styled/FlatIconButton';

const Actions: Type = ({ game, setFingersGame, setGroupsGame }) => {
	return (
		<div className='actions'>
			<FlatIconButton variant='rounded'>3</FlatIconButton>
		</div>
	);
};

export default Actions;
