import React from 'react'
import Question from '../Question/NewQuestion'
import cssClasses from './NewSurvey.css'

const newSurvey = (props) => {
    return (
        <div className={cssClasses.NewSurvey}>
            <p>Create new Survey</p>
            <label> Survey name: </label><input/>
            <Question/>
            <Question/>
            <Question/>
            <button className={cssClasses.SubmitButton}>Submit</button>
        </div>
    );
};

export default newSurvey;