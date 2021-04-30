import React from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import Button from '../button/button.jsx';
import styles from './mode-select-button.css'

const ModeButton = ({id,img, title, onclick,className})=>(
    <Button
        id = {id}
        iconSrc = {img}
        iconClassName = {classNames(styles.modeSelectButtonFont)}
        onClick = {onclick}
        className={className}
        disabled={false}
    >
        {title}
    </Button>
);


ModeButton.propTypes = {
    img: propTypes.string,
    title: propTypes.string,
    onclick: propTypes.func,
    className: propTypes.object
};

ModeButton.defaultProps = {
    onClick: ()=>{},
    title: ""
}

export default ModeButton;