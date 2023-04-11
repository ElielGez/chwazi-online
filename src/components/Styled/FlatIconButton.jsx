import React from 'react';
import { conditionalClassNames } from '../../utils/helpers';
import FlatButton from './FlatButton';
import './FlatIconButton.scss'

// like FlatButton, but with an icon instead of text
// variant = 'rounded'
const FlatIconButton = (props) => {
    const {className, variant,toggle,disabled, ...forwardProps} = props

    const forwardClassName = conditionalClassNames({
        'sm-flat-icon-button': true,
        [className]: Boolean(className),
        [variant]: Boolean(variant),
        'disabled':Boolean(disabled),
        'toggle': Boolean(toggle)
    });

    return (
        <FlatButton className={forwardClassName} disabled={disabled} {...forwardProps}>
            {props.children}
        </FlatButton>
    );
}

export default FlatIconButton
