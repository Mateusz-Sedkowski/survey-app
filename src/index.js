import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, {Auth} from "aws-amplify";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-west-1:9bd7125e-68e7-4eaa-852e-8090838b5aff',
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
                    return {Authorization: `Bearer ${(await Auth.currentSession()).idToken.jwtToken}`}
                }
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: 'survey-app-mateusz-sedkowski',
            region: 'eu-west-1'
        }
    }
})

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
