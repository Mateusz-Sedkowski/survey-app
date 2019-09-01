import React, { Component } from 'react'
import Question from '../Question/NewQuestion'
import cssClasses from './NewSurvey.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {ErrorMessage, Field, Form, Formik} from "formik"
import {API, Storage} from "aws-amplify"
import {PhotoPicker, S3Image} from "aws-amplify-react"

const uuid = require('uuid/v4')
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

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

class NewSurvey extends Component {
    state = {
        name: null,
        description: null,
        icon: null,
        expiry: Date.now(),
        questions: []
    }

    handleDataChange = event => {
        this.setState({
            expiry: event
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        let type = file['type'].split('/')[1]
        console.log("Type", type)
        Storage.put(`${uuid()}.${type}`, file)
            .then(response => {
                console.log("Response", response)
                this.setState({
                    key: response['key']
                })
            })
            .catch(error => console.log("Error", error))
    }

    createSurveyHandler = async () => {
        let myInit = {
            body: {
                survey: this.state
            }
        }
        this.setState({isLoading: true});
        await API.post('opinionPollApi', '/polls', myInit)
            .then(_ => {
                this.setState({isLoading: false});
                console.log("Done")
            }, rejected => {
                console.log("Rejected", rejected); //TODO REMOVE AT END
            })
    }

    render() {
        return (
            <div className={cssClasses.NewSurvey}>
                <h1>Create new Survey</h1>
                <Formik
                    initialValues={{}}
                    validateOnChange={true}
                    validateOnBlur={false}
                    validate={values => {
                        let errors = {}
                        console.log("Values", values)
                        return errors;
                    }}
                    onSubmit={() => {
                        console.log("State", this.state)
                        this.createSurveyHandler()
                    }}
                >
                    {({
                          handleSubmit,
                          setFieldValue,
                          setFieldTouched,
                          values,
                          errors,
                          touched,
                          isSubmitting
                      }) => (
                        <Form>
                            <div className='form-group'>
                                <label>Survey name: </label>
                                <Field type='text' name="name" onChange={this.handleChange}/>
                                <ErrorMessage name="name" component="div" className='errorMessage'/>
                            </div>
                            <div className='form-group'>
                                <label>Description: </label>
                                <Field component='textarea' name="description" onChange={this.handleChange}/>
                                <ErrorMessage name="description" component="div" className='errorMessage'/>
                            </div>
                            <div className='form-group'>
                                <S3Image imgKey={this.state.key} />
                                <label>Icon: </label>
                                <Field type='file' name="icon" accept="image/*" onChange={this.handleFileChange}/>
                                <ErrorMessage name="icon" component="div" className='errorMessage'/>
                            </div>
                            <div className='form-group'>
                                <label>Expiry</label>
                                <Field render={() =>
                                    <DatePicker
                                        minDate={Date.now()}
                                        peekNextMonth
                                        dateFormat="dd-MM-yyyy"
                                        value={values.expiry}
                                        selected={values.expiry || null}
                                        onChange={val => {
                                            this.setState({
                                                expiry: val
                                            })
                                            setFieldValue("expiry", val);
                                        }}
                                    />
                                }
                                       name="expiry"
                                       className='dobField'
                                />
                                <ErrorMessage name="expiry" component="div" className='errorMessage'/>
                            </div>
                            <div className="FormActions">
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <Question/>
                <Question/>
                <Question/>
            </div>
        )
    }
}

export default NewSurvey
