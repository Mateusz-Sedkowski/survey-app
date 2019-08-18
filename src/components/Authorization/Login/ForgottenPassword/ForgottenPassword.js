import React, {Component} from 'react'
import "./ForgottenPassword.css"
import {Auth} from "aws-amplify"
import {Link} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from "formik";

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

    resetPasswordHandler = async values => {
        this.setState({isLoading: true});
        try {
            await Auth.forgotPassword(values.email)
                .then(data => console.log(data), error => console.log("Error", error))
        } catch (e) {
            console.log(e.message); //TODO REMOVE AT END
            this.setState({isLoading: false});
        }
    }


    render() {
        return (
            <div className="ForgottenPassword">
                <div className="Controls">
                    <h1> Reset password </h1>
                    <h3> You will receive a password reset link on this email. </h3>
                    <Formik
                        initialValues={
                            {
                                email: ''
                            }
                        }
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = 'This field is required.'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address.';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => this.resetPasswordHandler(values)}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className='form-group'>
                                    <label>Email: </label>
                                    <Field type='email' name="email"/>
                                    <ErrorMessage name="email" component="div" className='errorMessage'/>
                                </div>
                                <div className="FormActions">
                                    <Link
                                        className="LogIn"
                                        to='/'>Return to login</Link>
                                    <button type="submit" disabled={isSubmitting}>Reset password</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default ForgottenPassword;