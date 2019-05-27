import React from 'react';
import cssClasses from './NewQuestion.css';

const newQuestion = (props) => {
    return (
        <div className={cssClasses.NewQuestion}>
            <label> Question: </label><input/>
        </div>
    );
};

export default newQuestion;