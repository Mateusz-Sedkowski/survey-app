import React, {Component} from 'react'
import './App.css'
import {withRouter} from 'react-router-dom'
import PublicView from './hoc/PublicView/PublicView'
import PrivateView from './hoc/PrivateView/PrivateView'
import {Auth} from "aws-amplify"


class App extends Component {
    state = {
        user: null,
        error: false,
        loading: false,
        name: null,
        questions: [],
        loggedIn: false
    }

    componentDidMount() {
        this.checkUserSession()
    }

    seconds_since_epoch = () => {
        return Math.floor(Date.now() / 1000)
    }

    createSurvey = () => {
        this.setState({
            loading: true
        })
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
        }
        console.log(newSurvey)
    }

    loginUserHandler = (user) => {
        this.setState({
            user: user,
            loggedIn: true
        })
    }

    logoutHandler = event => {
        event.preventDefault();
        Auth.signOut().then( data => {
            this.setState({
                user: null,
                loggedIn: false
            })
            this.props.history.push('/')
        })
    }

    checkUserSession = _ => {
        Auth.currentSession().then(event => {
            console.log("Fulfilled", event.accessToken.payload)
            this.setState({
                user: {
                    role: event.accessToken.payload['cognito:groups'][0]
                }
            })
            this.setUserCredentials()
        }, event => {
            console.log('Rejected', event)
            this.setState({
                loggedIn: false
            })
        })
    }

    setUserCredentials = _ => {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            console.log("User", user)
            this.setState({
                loggedIn: true,
                user: {
                    ...this.state.user,
                    first_name: user.attributes.name,
                    last_name: user.attributes.given_name
                }
            })
        })
    }

    render() {
        return (
                <div className="App">
                    {this.state.loggedIn ? <PrivateView user={this.state.user} logoutHandler={this.logoutHandler}/>
                    : <PublicView userLoginHandler={this.loginUserHandler}/>}
                </div>
        )
    }
}

export default withRouter(App)