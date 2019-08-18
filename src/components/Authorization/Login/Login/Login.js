import React, {Component} from 'react'
import './Login.css'
import {Auth} from 'aws-amplify'
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class Login extends Component {
    state = {
        isLoading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logInHandler = async values => {
        this.setState({isLoading: true});
        try {
            const userData = await Auth.signIn(values.email, values.password)
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
                    <Formik
                        initialValues={
                            {
                                email: '',
                                password: ''
                            }
                        }
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = 'This field is required.'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address.';
                            }
                            if (!values.password) {
                                errors.password = 'This field is required.'
                            } else if (!/^(?=.*[a-z])/i.test(values.password)) {
                                errors.password = 'Password should contain at least one lowercase letter'
                            } else if (!/^(?=.*[A-Z])/i.test(values.password)) {
                                errors.password = 'Password should contain at least one uppercase letter'
                            } else if (!/^(?=.*[0-9])/i.test(values.password)) {
                                errors.password = 'Password should contain at least one numeric character'
                            } else if (!/^(?=.*[!@#\$%\^&])/i.test(values.password)) {
                                errors.password = 'Password should contain at least one special character'
                            } else if (!/^(?=.{8,})/i.test(values.password)) {
                                errors.password = 'Password should be at least 8 sign long'
                            }
                            return errors;
                        }}
                        onSubmit={(values) => this.logInHandler(values)}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className='form-group'>
                                    <label>Email: </label>
                                    <Field type='email' name="email"/>
                                    <ErrorMessage name="email" component="div" className='errorMessage'/>
                                </div>
                                <div className='form-group'>
                                    <div className="PasswordLabels">
                                        <label>Password: </label>
                                        <Link
                                            className="ForgotPassword"
                                            to='/remindPassword'>Forgot password</Link>
                                    </div>
                                    <Field type='password' name="password"/>
                                    <ErrorMessage name="password" component="div" className='errorMessage'/>
                                </div>
                                <div className="FormActions">
                                    <Link
                                        className="SignIn"
                                        to='/register'>Sign in</Link>
                                    <button type="submit" disabled={isSubmitting}>Log in</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default Login;