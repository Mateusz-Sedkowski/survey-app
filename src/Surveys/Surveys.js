import React from 'react';
import Survey from './Survey/Survey';

const surveys = (props) => {
    return (
        <div>
        {props.surveys.map((survey) => {
                return (
                    <Survey
                        key={survey.Poll_UUID}
                        name={survey.Name}
                        expiry={survey.Expiry}
                        questions={survey.Questions}
                    />
                );
            })}
        </div>
    );
};

export default surveys;