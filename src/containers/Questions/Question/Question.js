import React from 'react';

const question = (props) => {
    return (
        <div>
            <p><strong>Question: {props.question.question}</strong></p>
        </div>
    );
};

export default question;
