import React, {Component} from 'react'
import './Login.css'
import {Auth} from 'aws-amplify'
import {Link} from 'react-router-dom'

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logInHandler = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            const userData = await Auth.signIn(this.state.email, this.state.password)
            const user = {
                first_name: userData.attributes.name,
                last_name: userData.attributes.given_name
            }
            this.props.userLoginHandler(user)
        } catch (e) {
            console.log(e.message); //TODO REMOVE AT END
            this.setState({isLoading: false});
        }
    }

    render() {
        return (
            <div className="LoginControls">
                <div className="Controls">
                    <h1> Log in </h1>
                    <label>Email: </label>
                    <input type='email' name='email' onChange={this.handleChange}/>
                    <div className="PasswordLabels">
                        <label>Password: </label>
                        <Link
                            className="ForgotPassword"
                            to='/remindPassword'>Forgot password</Link>
                    </div>
                    <input type='password' name='password' onChange={this.handleChange}/>
                    <div className="FormActions">
                        <Link
                            className="SignIn"
                            to='/register'>Sign in</Link>
                        <button onClick={this.logInHandler}>Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;