import React from 'react';
import Questions from '../../Questions/Questions';

const survey = (props) => {
    return (
        <div>
            <p>Survey Name: {props.name}</p>
            <p>Expiry: {props.expiry}</p>
            <Questions questionsList={props.questions}/>
        </div>
    );
};

export default survey;