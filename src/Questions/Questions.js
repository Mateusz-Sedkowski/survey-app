import React from 'react';
import Question from './Question/Question';

const questions = (props) => {
    return (
        <div>
            {props.questionsList.map((question) => <Question key={question.UUID} question={question} /> )}
        </div>
    );
};

export default questions;