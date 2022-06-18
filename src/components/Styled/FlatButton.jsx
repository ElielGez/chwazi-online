import React, { useState } from 'react';
import { conditionalClassNames } from '../../utils/helpers';
import Button from './Button';

import './FlatButton.scss'

// Button used in the SecureMe flow, e.g. Back, Continue

const FlatButton = (props) => {
    const {className, onClick, onAnimationEnd, cancelBubbling, disableAnim, ...forwardProps} = props

    const [clickAnim, setClickAnim] = useState(false) // is the button animated?
    const [clickEvent, setClickEvent] = useState() // keeps the original click event

    const onStartClickAnim = (e) => {
        if(disableAnim) {
            // adding the option to disable animation , causing bug in safari to open file input dialog
            onClick();
            return;
        }
        if (cancelBubbling) {
            e.preventDefault()
            e.stopPropagation()
        }

        setClickEvent(e) // save click event for later
        setClickAnim(true) // start click animation
    }
    
    const onFinishClickAnim = (e) => {
        if (clickAnim && e.animationName === 'flat-button-click') { // check if button is finishing click animation
            setClickAnim(false) // click animation is over
            if (onClick) onClick(clickEvent) // if available, execute onClick callback with previously saved event
        }
        if (onAnimationEnd) onAnimationEnd(e)
    }

    const forwardClassName = conditionalClassNames({
        'sm-flat-button': true,
        [className]: Boolean(className),
        'click': clickAnim, // animation is done by adding "click" class
    })

    return (
        <Button className={forwardClassName} onClick={onStartClickAnim} onAnimationEnd={onFinishClickAnim} {...forwardProps}>
            {props.children}
        </Button>
    );
}

export default FlatButton
