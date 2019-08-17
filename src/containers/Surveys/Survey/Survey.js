import React, {Component} from 'react'
import cssClasses from './Survey.css'
import {API} from "aws-amplify";

class Survey extends Component {
    state = {
        survey: null,
        error: false,
        loading: true,
    }

    componentDidMount() {
        API.get('opinionPollApi', `${this.props.location.pathname}`)
            .then(response => {
                console.log("Surveys", response)
                this.setState({
                    survey: response.body,
                    loading: false
                })
                console.log(this.state)
            })
            .catch(error => {
                this.setState({error: true})
                console.log(error)
            })
    }

    render() {
        let survey = null
        if (this.state.survey) {
            console.log("Survey?")
            survey = (<div>
                <h3> {this.state.survey.Name} </h3>
                {this.state.survey.Icon ? <img src={this.state.survey.Icon} width="40px" height="40px"/> : null}
                <p> {this.state.survey.Description} </p>
                {/*/!*<td> {props.questions ? props.questions.length : 0} </td>*!/*/}
                <p> {this.state.survey.Expiry} </p>
            </div>)
        }

        return (
            <div>
                <h1>Survey Details</h1>
                {survey}
            </div>
        )
    }
}

export default Survey
