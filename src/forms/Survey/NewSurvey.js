import React, { Component } from 'react'
import NewQuestions from '../Question/NewQuestions'
import classes from './NewSurvey.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {ErrorMessage, Field, Form, Formik} from "formik"
import {API, Storage} from "aws-amplify"
import {S3Image} from "aws-amplify-react"

const uuid = require('uuid/v4')

class NewSurvey extends Component {
    state = {
        name: null,
        description: null,
        icon: null,
        expiry: Date.now(),
        questions: []
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
        this.setState({
            icon: file
        })
    }

    createSurveyHandler = async (values) => {
        let file = this.state.icon
        let type = file['type'].split('/')[1]
        await Storage.put(`${uuid()}.${type}`, file)
            .then( async (response) => {
                console.log("Response", response['key'])
                await this.setState({
                    icon: response['key']
                })
            })
            .catch(error => console.log("Error", error))

        let myInit = {
            body: {
                survey: {
                    ...values,
                    icon: this.state.icon,
                    created: Date.now()
                }
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
            <div className={classes.NewSurvey}>
                <h1 className={classes.NewSurveyHeader}>Create new Survey</h1>
                <Formik
                    initialValues={{}}
                    validate={values => {
                        let errors = {}
                        console.log("Values", values)
                        return errors;
                    }}
                    onSubmit={(values) => {
                        console.log("Values bs", values)
                        this.createSurveyHandler(values)
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
                        <Form className={classes.NewSurveyForm}>
                            <div className='form-group'>
                                <label>Survey name: </label>
                                <Field type='text' name="name" onChange={ val => {
                                    this.handleChange(val)
                                    setFieldValue("name", val.target.value)
                                }}/>
                                <ErrorMessage name="name" component="div" className='errorMessage'/>
                            </div>
                            <div className='form-group'>
                                <label>Description: </label>
                                <Field component='textarea' name="description" onChange={ val => {
                                    this.handleChange(val)
                                    setFieldValue("description", val.target.value);
                                }}/>
                                <ErrorMessage name="description" component="div" className='errorMessage'/>
                            </div>
                            <div className='form-group'>
                                <label>Icon: </label>
                                <Field type='file' name="icon" accept="image/*" onChange={ val => {
                                    this.handleFileChange(val)
                                }}/>
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
                            <div className='form-group'>
                                <Field name="question" render={() =>
                                    <NewQuestions
                                        setFieldValue={setFieldValue}
                                        value={values.question}
                                    />
                                }/>
                                <ErrorMessage name="question" component="div" className='errorMessage'/>
                            </div>
                            <div className="FormActions">
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default NewSurvey
