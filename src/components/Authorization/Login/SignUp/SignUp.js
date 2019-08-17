import React, {Component} from 'react'
import './SignUp.css'
import {Auth} from "aws-amplify"
import {Link, withRouter} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'

class SignUp extends Component {
    state = {
        user: {
            first_name: '',
            last_name: '',
            email: '',
            phone: null,
            password: '',
            gender: 'Female',
            birthdate: '17-04-1993',
            address: 'Rojna 50c/80',
        },
        isLoading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUpHandler = async values => {
        this.setState({isLoading: true});
        let user = this.state.user
        await Auth.signUp({
            username: values.email,
            password: values.password,
            attributes: {
                email: values.email,
                phone_number: values.phone,
                name: values.first_name,
                given_name: values.last_name,
                gender: values.gender,
                birthdate: user.birthdate,
                address: user.address
            }
        }).then(_ => {
            this.setState({isLoading: false});
            console.log("Done")
            this.props.history.push('/')
        }, rejected => {
            console.log("Rejected", rejected); //TODO REMOVE AT END
        })
    }

    render() {
        return (
            <div className="SignUp">
                <div className="Controls">
                    <h1> Create Account </h1>
                    <Formik
                        initialValues={
                            {
                                first_name: '',
                                last_name: '',
                                email: '',
                                gender: null,
                                phone: '',
                                password: ''
                            }
                        }
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = 'This field is required.';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address.';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => this.signUpHandler(values)}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className='form-group'>
                                    <label>First Name </label>
                                    <Field type='text' name="first_name"/>
                                    <ErrorMessage name="first_name" component="div" className='errorMessage'/>
                                </div>
                                <div className='form-group'>
                                    <label>Last Name </label>
                                    <Field type='text' name="last_name"/>
                                    <ErrorMessage name="last_name" component="div" className='errorMessage'/>
                                </div>
                                <div className='form-group'>
                                    <label>Email </label>
                                    <Field type='email' name="email"/>
                                    <ErrorMessage name="email" component="div" className='errorMessage'/>
                                </div>
                                <div className='form-group'>
                                    <label>Phone </label>
                                    <Field type='text' name="phone"/>
                                    <ErrorMessage name="phone" component="div" className='errorMessage'/>
                                </div>
                                <div className='form-group'>
                                    <label>Gender </label>
                                    <Field component="select" name="gender" className='genderSelect'>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                    </Field>
                                </div>
                                <div className='form-group'>
                                    <label>Password </label>
                                    <Field type='password' name="password"/>
                                    <ErrorMessage name="password" component="div" className='errorMessage'/>
                                </div>
                                <div className="FormActions">
                                    <Link
                                        className="LogIn"
                                        to='/'>Already have an account?</Link>
                                    <button type="submit" disabled={isSubmitting}>
                                        Sign Up
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default SignUp;