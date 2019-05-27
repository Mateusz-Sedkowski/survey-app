import React, {Component} from 'react'
import cssClasses from "./Authorization.css"
import LoginControls from "../../forms/Login/LoginControls/LoginControls"
import ForgottenPasswordControls from "../../forms/Login/ForgottenPasswordControls/ForgottenPasswordControls"
import SignUpControls from "../../forms/Login/SignUpControls/SignUpControls"
import { Auth } from 'aws-amplify'

class Authorization extends Component {
    state = {
        forgotenPassword: false,
        signUpActive: false,
        email: 'mateusz.sedkowski@gmail.com',
        password: 'Password1!'
    }

    forgottenPasswordHandler = () => {
        this.setState({
            signUpActive: false,
            forgotenPassword: true
        })
    }

    signUpHandler = () => {
        this.setState({
            signUpActive: true,
            forgottenPassword: false
        })
    }

    logInHandler = () => {
        this.setState({
            signUpActive: false,
            forgotenPassword: false
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const user = await Auth.signIn(this.state.email, this.state.password)
            console.log(user)
        } catch (e) {
            alert(e.message);
        }
    };

    render() {
    let activeForm = <LoginControls remindPassword={this.forgottenPasswordHandler} signUp={this.signUpHandler} submitHandle={this.handleSubmit}/>

    if (this.state.forgotenPassword) {
        activeForm = <ForgottenPasswordControls logIn={this.logInHandler}/>
    } else if (this.state.signUpActive) {
        activeForm = <SignUpControls logIn={this.logInHandler}/>
    }

        return (
            <div className={cssClasses.Auth}>
                {activeForm}
                <div className={cssClasses.Image} />
            </div>
        )
    }
}

export default Authorization