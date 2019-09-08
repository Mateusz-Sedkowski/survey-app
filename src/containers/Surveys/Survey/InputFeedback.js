import React from 'react'
import classes from './InputFeedback.module.scss'

const InputFeedback = ({ error }) =>
    error ? <div className={classes.ErrorMessage}>{error}</div> : null;

export default InputFeedback