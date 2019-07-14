import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar'
import Surveys from '../../containers/Surveys/Surveys'
import './PrivateView.css'
import SurveyForm from '../../forms/Survey/NewSurvey'
import Amplify, {API, Auth} from 'aws-amplify'

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

class PrivateView extends Component {
    state = {
        surveys: [],
        error: false,
        loading: true,
    }

    componentDidMount() {
        Amplify.configure({
            Auth: {
                identityPoolId: 'eu-west-1:91fb9945-9043-466c-a5e2-504543f00f1f',
                region: 'eu-west-1',
                userPoolId: 'eu-west-1_yVFofTDtQ',
                userPoolWebClientId: '4srm461qho53dc0v183s5tiq0t',
            },
            Analytics: {
                disabled: true,
            },
            API: {
                endpoints: [
                    {
                        name: "opinionPollApi",
                        endpoint: "https://ksw0mns3i5.execute-api.eu-west-1.amazonaws.com/Production",
                        region: "eu-west-1",
                        custom_header: async () => {
                            return { Authorization: `Bearer ${(await Auth.currentSession()).idToken.jwtToken}` }
                        }
                    }
                ]
            }
        })
        API.get('opinionPollApi', '/polls')
            .then(response => {
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
        let surveys = null;
        if (this.state.surveys.length) {
            surveys = <Surveys surveys={this.state.surveys}/>
        }

        return (
            <div>
                <Navbar user={this.props.user} logoutHandler={this.props.logoutHandler}/>
                <div className="mainContent">
                    <h1>Available Surveys</h1>
                    {surveys}
                </div>
                {/*<SurveyForm/>*/}
            </div>
        );
    }
}

export default PrivateView;
