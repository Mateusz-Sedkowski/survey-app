import React, { Component } from 'react'
import cssClasses from './SignUpControls.css'

class SignUpControls extends Component {
    render () {
        return (
            <div className={cssClasses.SignUp}>
                <div className={cssClasses.Controls}>
                    <h1> Create Account </h1>
                    <label>First Name: </label>
                    <input/>
                    <label>Last Name: </label>
                    <input/>
                    <label>Email: </label>
                    <input/>
                    <label>Password: </label>
                    <input/>
                    <div className={cssClasses.FormActions}>
                        <label
                            className={cssClasses.LogIn}
                            onClick={this.props.logIn}>Already have an account?</label>
                        <button>Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpControls;