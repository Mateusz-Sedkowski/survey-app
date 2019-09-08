import React, {Component} from 'react'
import Login from "./Login/Login/Login"
import ForgottenPassword from "./Login/ForgottenPassword/ForgottenPassword"
import SignUp from "./Login/SignUp/SignUp"
import { Route } from 'react-router-dom'

class Authorization extends Component {
    render() {
        return (
            <>
                <Route path="/" exact render={ () => <Login userLoginHandler={this.props.userLoginHandler}/> } />
                <Route path="/register" exact render={ () => <SignUp/> } />
                <Route path="/remindPassword" exact render={ () => <ForgottenPassword/> } />
            </>
        )
    }
}

export default Authorization