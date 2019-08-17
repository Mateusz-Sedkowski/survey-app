import React, { Component } from 'react'

class AnswerSurvey extends Component {
    state = {
        survey: this.props.survey
    }

    render() {
        return (
            <div>
                <h1>{this.state.survey.name}</h1>
                <p>{this.state.survey.description}</p>
                {this.state.survey.questions.map(question => <p><b>{question}</b></p> )}
            </div>
        )
    }
}

export default AnswerSurvey