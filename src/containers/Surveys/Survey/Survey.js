import React from 'react';
import Questions from '../../Questions/Questions';
import cssClasses from './Survey.css';

const survey = (props) => {
    const date = new Date(Number(props.created) * 1000);

    return (
        <div className={cssClasses.Survey}>
            <div className={cssClasses.Title}>
                <p>Survey Name: {props.name}</p>
                <p>Created: {date.toLocaleString()}</p>
            </div>
            <Questions questionsList={props.questions}/>
        </div>
    );
};

export default survey;