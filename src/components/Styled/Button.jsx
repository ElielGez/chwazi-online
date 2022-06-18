import React from 'react';
import { contencateClassNames } from '../../utils/helpers';

import './Button.scss'

// Generic, all purpose button, aimed to replace the usage of html tag <button>

// Note: as any change here influences all buttons built upon it,
// it's best to create a new component that uses Button as foundation and then customize it

const Button = (props) => {
    const {className, ...forwardProps} = props
    
    const forwardClassName = contencateClassNames('sm-button', className)

    return (
        <button className={forwardClassName} {...forwardProps}>
            {props.children}
        </button>
    );
}

export default Button