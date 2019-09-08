import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify'
import Config from './config'
import * as serviceWorker from './serviceWorker';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: Config.cognito.REGION,
        userPoolId: Config.cognito.USER_POOL_ID,
        identityPoolId: Config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: Config.cognito.APP_CLIENT_ID
    },
    Analytics: {
        disabled: true
    },
    API: {
        endpoints: {
            name: 'opinionPollApi',
            endpoint: 'https://ksw0mns3i5.execute-api.eu-west-1.amazonaws.com/Production',
            region: 'eu-west-1'
        }
    }
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
