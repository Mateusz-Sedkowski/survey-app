import React, {Component} from 'react'
import Surveys from './Surveys'
import Amplify, {API, Auth} from "aws-amplify"

class AvailableSurveys extends Component {
    state = {
        surveys: [],
        error: false,
        loading: true
    }

    componentDidMount() {
        API.get('opinionPollApi', '/polls')
            .then(response => {
                console.log("Surveys", response)
                this.setState({
                    surveys: response.body,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({error: true})
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h1>Available Surveys</h1>
                <Surveys surveys={this.state.surveys}/>
            </div>
        )
    }
}

export default AvailableSurveys