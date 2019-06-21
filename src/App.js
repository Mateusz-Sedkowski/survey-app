import React, {Component} from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
// import axios from './axios-orders'
import PublicView from './hoc/PublicView/PublicView'
import PrivateView from './hoc/PrivateView/PrivateView'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretDown, faFileSignature, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faFileSignature, faCog, faSignOutAlt)

class App extends Component {
    state = {
        user: null,
        error: false,
        loading: false,
        name: null,
        questions: []
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
        // TODO COMMENTED TO SAVE AWS FREE TIER
        // axios.post('/polls', newSurvey, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(
        //         (response) => {
        //             console.log(response)
        //             this.setState({
        //                 loading: false
        //             })
        //         }
        //     )
        //     .catch(
        //         (error) => {
        //             console.log(error)
        //             this.setState({
        //                 loading: false
        //             })
        //         }
        //     )
    }

    loginUserHandler = (user) => {
        this.setState({
            user: user
        })
    }

    logoutHandler = () => {
        this.setState({
            user: null
        })
    }

    render() {
        let view = <PublicView userLoginHandler={this.loginUserHandler}/>

        if (this.state.user != null) {
            view = <PrivateView user={this.state.user} logoutHandler={this.logoutHandler}/>
        }
        return (
            <BrowserRouter>
                <div className="App">
                    {view}
                </div>
            </BrowserRouter>
        )
    }
}

export default App
