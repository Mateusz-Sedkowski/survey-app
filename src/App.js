import React, {Component} from 'react';
import './App.css';
// import axios from './axios-orders'; TODO TO SAVE AWS FREE TIER
import Surveys from './containers/Surveys/Surveys';
import SurveyForm from './Forms/Survey/NewSurvey';
import Navbar from './hoc/Navbar/Navbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faFileSignature, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faFileSignature, faCog, faSignOutAlt)

class App extends Component {
    state = {
        surveys: [
            {
                Poll_UUID: '24db357f-75e4-4e69-8b85-e1a1138d394c',
                Name: 'Amazing Survey',
                Created: 1558768782,
                Questions: [
                    {
                        UUID: 'f79e760e-16db-4684-86db-844c6f40aa4f',
                        question: 'How are You today?'
                    }
                ]
            }
        ],
        error: false,
        loading: false,
        name: null,
        questions: []
    };

    componentDidMount() {
        // TODO COMMENTED TO SAVE AWS FREE TIER
        // axios.get('/polls')
        //     .then(response => {
        //         this.setState({
        //             surveys: response.data.body
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    seconds_since_epoch = () => { return Math.floor( Date.now() / 1000 ) };

    createSurvey = () => {
        this.setState({
            loading: true
        });
        const newSurvey = {
            // Name: this.state.name,
            poll: {
                Name: 'React Test',
                Created: this.seconds_since_epoch(),
                Expiry: this.seconds_since_epoch() + 3600 * 24, //TODO Change that!,
                // Questions: this.state.questions,
                Questions: [
                    {
                        question: 'React test question 1'
                    }
                ]
            }
        };

        console.log(newSurvey);
        // TODO COMMENTED TO SAVE AWS FREE TIER
        // axios.post('/polls', newSurvey, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(
        //         (response) => {
        //             console.log(response);
        //             this.setState({
        //                 loading: false
        //             });
        //         }
        //     )
        //     .catch(
        //         (error) => {
        //             console.log(error);
        //             this.setState({
        //                 loading: false
        //             });
        //         }
        //     )
    };

    render() {
        return (
            <div className="App">
                <Navbar/>
                <Surveys surveys={this.state.surveys}/>
                <SurveyForm/>
            </div>
        );
    }
}

export default App;
