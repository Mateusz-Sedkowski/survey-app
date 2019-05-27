import React from 'react'
import Survey from './Survey/Survey'
import cssClasses from './Surveys.css'

const surveys = (props) => {
    return (
        <div className={cssClasses.Surveys}>
        {props.surveys.map((survey) => {
                return (
                    <Survey
                        key={survey.Poll_UUID}
                        name={survey.Name}
                        created={survey.Created}
                        questions={survey.Questions}
                    />
                )
            })}
        </div>
    )
}

export default surveys
