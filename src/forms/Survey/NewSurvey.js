import React, {Component} from 'react'
import NewQuestions from '../Question/NewQuestions'
import classes from './NewSurvey.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {ErrorMessage, Field, Form, Formik} from "formik"
import {API, Storage} from "aws-amplify"
import * as Yup from 'yup'

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
            icon: file,
            fileName: file.name
        })
    }

    createSurveyHandler = async (values) => {
        let file = this.state.icon
        let type = file['type'].split('/')[1]
        await Storage.put(`${uuid()}.${type}`, file)
            .then(async (response) => {
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
        let initialValue = {
            name: '',
            description: '',
            icon: null,
            expiry: null,
            questions: [
                {
                    question: '',
                    answers: [
                        {
                            name: ''
                        },
                        {
                            name: ''
                        }
                    ]
                }
            ]
        }
        let answerShape = {
            name: Yup.string().required('Answer value is required')
        }

        let questionShape = {
            question: Yup.string().required('Question is required'),
            answers: Yup.array().of(Yup.object().shape(answerShape))
        }

        let initialShape = {
            name: Yup.string().required('Survey name is required.'),
            description: Yup.string().required('Survey description is required.'),
            icon: Yup.string().required('Survey icon is required.').nullable(),
            expiry: Yup.string().required('Survey expiration date is required.').nullable(),
            questions: Yup.array().of(Yup.object().shape(questionShape))
        }

        return (
            <div className={classes.NewSurvey}>
                <h1 className={classes.NewSurveyHeader}>Create Survey</h1>
                <Formik
                    initialValues={initialValue}
                    validationSchema={Yup.object().shape(initialShape)}
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
                            <div className={classes.Row}>
                                <div className={classes.FormGroup}>
                                    <label>Name</label>
                                    <Field type='text' name="name"/>
                                    <div className={classes.Error}>
                                        <ErrorMessage name="name" component="div" className={classes.ErrorMessage}/>
                                    </div>
                                </div>
                                <div className={classes.FormGroup}>
                                    <label>Icon </label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                name="icon"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                                accept="image/*"
                                                onChange={val => {
                                                    this.handleFileChange(val)
                                                    setFieldValue('icon', val.target.value)
                                                }}
                                            />
                                            <label className={["custom-file-label", classes.customFileLabel].join(' ')} htmlFor="inputGroupFile01">
                                                { this.state.fileName || "Choose file" }
                                            </label>
                                        </div>
                                    </div>
                                    <div className={classes.Error}>
                                        <ErrorMessage name="icon" component="div" className={classes.ErrorMessage}/>
                                    </div>
                                </div>
                                <div className={classes.FormGroup}>
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
                                    <div className={classes.Error}>
                                        <ErrorMessage name="expiry" component="div" className={classes.ErrorMessage}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.Row}>
                                <div className={[classes.FormGroup, classes.DescriptionFormGroup].join(' ')}>
                                    <label>Description </label>
                                    <Field component='textarea' name="description"/>
                                    <div className={classes.Error}>
                                        <ErrorMessage name="description" component="div"
                                                      className={classes.ErrorMessage}/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <Field name="question" render={() =>
                                    <NewQuestions
                                        setFieldValue={setFieldValue}
                                        value={values.question}
                                    />
                                }/>
                                <div className={classes.Error}>
                                    <ErrorMessage name="question" component="div" className='errorMessage'/>
                                </div>
                            </div>
                            <div className={classes.SubmitButton}>
                                <button type="submit">
                                    Save
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
