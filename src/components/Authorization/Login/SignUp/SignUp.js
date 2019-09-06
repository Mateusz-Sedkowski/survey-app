import React, {Component} from 'react'
import './SignUp.css'
import {Auth} from "aws-amplify"
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import DatePicker from "react-datepicker/es"
import range from "lodash/range"
import getYear from "date-fns/getYear"
import getMonth from "date-fns/getMonth"

const years = range(1990, getYear(new Date()) + 1, 1);
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

class SignUp extends Component {
    state = {
        user: {
            address: 'Rojna 50c/80',
        },
        isLoading: false
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
                birthdate: values.birthdate,
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
                                gender: '',
                                birthdate: '',
                                phone: '',
                                password: ''
                            }
                        }
                        validate={values => {
                            let errors = {};
                            Object.keys(values).forEach((key) => {
                                if (!values[key] || values[key] === '') {
                                    errors[key] = 'This field is required.'
                                } else if (key === 'email' &&
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address.';
                                } else if (key === 'password') {
                                    if (!/^(?=.*[a-z])/i.test(values.password)) {
                                        errors.password = 'Password should contain at least one lowercase letter'
                                    } else if (!/^(?=.*[A-Z])/i.test(values.password)) {
                                        errors.password = 'Password should contain at least one uppercase letter'
                                    } else if (!/^(?=.*[0-9])/i.test(values.password)) {
                                        errors.password = 'Password should contain at least one numeric character'
                                    } else if (!/^(?=.*[!@#$%^&])/i.test(values.password)) {
                                        errors.password = 'Password should contain at least one special character'
                                    } else if (!/^(?=.{8,})/i.test(values.password)) {
                                        errors.password = 'Password should be at least 8 sign long'
                                    }
                                } else if (key === 'phone') {
                                    if (!/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g.test(values.phone)) {
                                        errors.phone = 'Invalid phone format.'
                                    }
                                }
                            })
                            return errors;
                        }}
                        onSubmit={(values) => this.signUpHandler(values)}
                    >
                        {({values, isSubmitting, setFieldValue}) => (
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
                                    <label>Date of Birth</label>
                                    <Field render={() =>
                                        <DatePicker
                                            maxDate={Date.now()}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dateFormat="dd-MM-yyyy"
                                            dropdownMode="select"
                                            value={values.birthdate}
                                            selected={values.birthdate || null}
                                            onChange={val => {
                                                setFieldValue("birthdate", val);
                                            }}
                                            renderCustomHeader={({
                                                                     date,
                                                                     changeYear,
                                                                     changeMonth
                                                                 }) => (
                                                <div className="header">
                                                    <select value={months[getMonth(date)]}
                                                            onChange={({target: {value}}) => changeMonth(months.indexOf(value))}>
                                                        {months.map(option => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select value={getYear(date)}
                                                            onChange={({target: {value}}) => changeYear(value)}>
                                                        {years.map(option => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )
                                            }
                                        />
                                    }
                                           name="birthdate"
                                           className='dobField'
                                    />
                                    <ErrorMessage name="birthdate" component="div" className='errorMessage'/>
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