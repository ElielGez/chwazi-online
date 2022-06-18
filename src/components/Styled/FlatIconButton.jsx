import React from 'react';
import { contencateClassNames } from '../../utils/helpers';
import FlatButton from './FlatButton';
import './FlatIconButton.scss'

// like FlatButton, but with an icon instead of text
// variant = 'rounded'
const FlatIconButton = (props) => {
    const {className, variant, ...forwardProps} = props

    const forwardClassName = contencateClassNames('sm-flat-icon-button', variant, className)

    return (
        <FlatButton className={forwardClassName} {...forwardProps}>
            {props.children}
        </FlatButton>
    );
}

export default FlatIconButton
