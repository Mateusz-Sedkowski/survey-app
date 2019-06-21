import React, { Component } from 'react'
import cssClasses from "./ForgottenPassword.css"
import {Auth} from "aws-amplify";

class ForgottenPassword extends Component {
    state = {
        username: '',
        isLoading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUpHandler = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.forgotPassword(this.state.username)
                .then(data => console.log(data))
        } catch (e) {
            console.log(e.message); //TODO REMOVE AT END
            this.setState({isLoading: false});
        }
    }


    render () {
        return (
            <div className={cssClasses.ForgottenPassword}>
                <div className={cssClasses.Controls}>
                    <h1> Reset password </h1>
                    <h3> You will receive a password reset link on this email. </h3>
                    <label>Email: </label>
                    <input type='email' name='username' onChange={this.handleChange}/>
                    <div className={cssClasses.FormActions}>
                        <a
                            className={cssClasses.LogIn}
                            href='/'>Return to login</a>
                        <button onClick={this.signUpHandler}>Reset password</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgottenPassword;