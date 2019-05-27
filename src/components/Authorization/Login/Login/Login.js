import React, { Component } from 'react'
import cssClasses from './LoginControls.css'

class LoginControls extends Component {
    render () {
        return (
            <div className={cssClasses.LoginControls}>
                <div className={cssClasses.Controls}>
                    <h1> Log in </h1>
                    <label>Email: </label>
                    <input/>
                    <div className={cssClasses.PasswordLabels}>
                        <label>Password: </label>
                        <label
                            className={cssClasses.ForgotPassword}
                            onClick={this.props.remindPassword}>Forgot password</label>
                    </div>
                    <input/>
                    <div className={cssClasses.FormActions}>
                        <label
                            className={cssClasses.SignIn}
                            onClick={this.props.signUp}>Sign in</label>
                        <button onClick={this.props.submitHandle}>Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginControls;