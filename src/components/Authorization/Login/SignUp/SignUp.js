import React, { Component } from 'react'
import cssClasses from './SignUp.css'
import {Auth} from "aws-amplify";

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        phone: null,
        password: '',
        gender: 'Female',
        birthdate: '17-04-1993',
        address: 'Rojna 50c/80',
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
            await Auth.signUp({
                username: this.state.username,
                password: this.state.password,
                attributes: {
                    email: this.state.username,
                    phone_number: this.state.phone,
                    name: this.state.firstName,
                    given_name: this.state.lastName,
                    gender: this.state.gender,
                    birthdate: this.state.birthdate,
                    address: this.state.address
                }
            })
        } catch (e) {
            console.log(e.message); //TODO REMOVE AT END
            this.setState({isLoading: false});
        }
    }

    render () {
        return (
            <div className={cssClasses.SignUp}>
                <div className={cssClasses.Controls}>
                    <h1> Create Account </h1>
                    <label>First Name: </label>
                    <input name='firstName' onChange={this.handleChange}/>
                    <label>Last Name: </label>
                    <input name='lastName' onChange={this.handleChange}/>
                    <label>Email: </label>
                    <input type='email' name='username' onChange={this.handleChange}/>
                    <label>Phone: </label>
                    <input name='phone' onChange={this.handleChange}/>
                    <label>Password: </label>
                    <input type='password' name='password' onChange={this.handleChange}/>
                    <div className={cssClasses.FormActions}>
                        <a
                            className={cssClasses.LogIn}
                            href='/'>Already have an account?</a>
                        <button onClick={this.signUpHandler}>Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;